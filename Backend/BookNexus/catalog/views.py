from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    """
    API view for user registration.
    Allows any user (even unauthenticated ones) to create an account.
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
