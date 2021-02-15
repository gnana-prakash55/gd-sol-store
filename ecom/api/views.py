from django.http import JsonResponse


def home(request):
    return JsonResponse({'name':'Sanjay','course':'Django React Course'})
