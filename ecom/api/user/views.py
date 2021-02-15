
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login,logout
from django.http import JsonResponse
import random
import re

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)]+  \
            [str(i) for i in range(10)]+[chr(i) for i in range(65,91)]) for _ in range(length))


@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error':'Send a post request only'})
    
    username = request.POST['email']
    password = request.POST['password']

    if not re.match(r"^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$",username):
        return JsonResponse({'error':'Enter a valid Email'})

    if not re.match(r"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",password):
        return JsonResponse({'error':'Enter a valid Password'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            usr_dict = UserModel.objects.filter(email=username).values().first()
            usr_dict.pop('password')

            if user.session_token != '0':
                user.session_token = '0'
                user.save()
                return JsonResponse({'error':'Previous session already exists'})

            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request,user)
            return JsonResponse({'token':token,'user':usr_dict})
        else:
            return JsonResponse({'error':'Invalid Password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid Email'})


def signout(request,id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = '0'
        user.save()
    
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid User'})
    return JsonResponse({'success':'Logged out successfully'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create':[AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer
    


    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]