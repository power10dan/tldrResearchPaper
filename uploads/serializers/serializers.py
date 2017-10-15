from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


"""
Serializers convert complex data to native python data types
"""

# inherit from ModelSerializer, this automatically creates the validators
# based on the Model
class UserSerializer(serializers.ModelSerializer): 
    """
    User serializers for the app, this will take the json request and convert
    the necessary data to native python strings, making sure that the email
    user name, and password are unique with respect to the db
    """

    # validate the request email, username and password fields
    # Here declare email to be an email field, and make sure it is unique
    email = serializers.EmailField(
        required = True, # An email field must be supplied or else failure
        validators = [UniqueValidator(queryset=User.objects.all())]
        )

    # Same as email, make sure the username is unique
    username = serializers.CharField(
        max_length = 50,
        validators = [UniqueValidator(queryset=User.objects.all())]
        )

    # pass must be >= 12 chars
    password = serializers.CharField(min_length = 12, write_only=True)

    # now supply methods to actually create the user
    def create(self, validated_data):
        """
        method takes self and validated data, creates a new user with the 
        validated data
        """

        # we must user the create_user method instead of djangos built in create
        # method because of the restful framework
        user = User.objects.create_user(validated_data['username']
                                        , validated_data['email']
                                        , validated_data['password'])
        return user

    class Meta:
        """
        This dictates that the model to user for our serializer is the django
        User model. This is how the ModelSerializer knows what validators to
        create
        """
        model = User
        fields = ('id', 'username', 'email', 'password')
