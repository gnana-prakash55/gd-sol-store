from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import permission_classes,authentication_classes
import re

from .models import CustomUser

class UserSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr,value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance,attr,value)
        instance.save()
        return instance
    
    def validate_password(self, value):
        if not re.match(r"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",value):
            raise serializers.ValidationError('- at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters')
        return value

    class Meta:
        model = CustomUser
        extra_kwargs = {'password':{'write_only':True }}
        fields = ('name','email','password','phone','gender','country',
                    'is_active','is_staff','is_superuser')