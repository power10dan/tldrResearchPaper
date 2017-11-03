from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token


class AccountsTest(APITestCase):
    def setUp(self):

        # Create a test user
        self.test_user = User.objects.create_user('testuser'
                                                  , 'test@example.com'
                                                  , 'testpassword')

        # # URL for creating an account.
        self.create_url = reverse('rest_register')

    # tests must start with "test" or else Django will not find it
    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """

        # the data to send to the server
        data = {
            'username': 'someUser',
            'account_emailaddress': 'someUsersEmail@example.com',
            'password1': 'someUsersPassword',
            'password2': 'someUsersPassword'
        }

        # send the data to the server in json form with request POST
        response = self.client.post(self.create_url , data, format='json')

        # make sure this is atlest two users in db, which we created above
        self.assertEqual(User.objects.count(), 2)

        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        #Check that if a user is created a valid key is returned.
        self.assertEqual(len(response.data['key']), 40)
        self.assertFalse('password' in response.data)

    def test_create_user_with_no_pass(self):
        """
        Make sure that if a user tries to create an account with no password,
        then the creation will fail
        """

        data = {
            'username': 'IdontlikePasswords',
            'account_emailaddress': 'WeShouldBeFreeAndOpen@foss.com',
            'password1': '',
            'password2': ''
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response password was empty
        self.assertEqual(len(response.data['password1']), 1)

    def test_create_user_long_name(self):
        """
        If a user tries to make an account with a name that is too long we
        prevent the account creation and return a bad request
        """

        data = {
            'username': 'ilikealongusername'*500,
            'account_emailaddress': 'WeShouldBeFreeAndOpen@foss.com',
            'password1': 'longusername',
            'password2': 'longusername'
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response password was empty
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_no_name(self):
        """
        If a user tries to make an account without a name we
        prevent the account creation and return a bad request
        """

        data = {
            'username': '',
            'account_emailaddress': 'WeShouldBeFreeAndOpen@foss.com',
            'password1': 'nousername',
            'password2': 'nousername'
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response username was empty
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_existing_name(self):
        """
        If a user tries to make an account with a name that already exists we
        prevent the account creation and return a bad request
        """

        data = {
            'username': 'testuser',
            'account_emailaddress': 'yetanotheremail@foss.com',
            'password1': 'atotallyuniquepassword',
            'password2': 'atotallyuniquepassword'
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response username was empty
        self.assertEqual(len(response.data['username']), 1)

    def test_create_new_user_with_auth_token(self):
        """
        Ensure that can create a new user, and that user gets an auth token
        generated for their account
        """

        data = {
            'username' : 'iwantatoken',
            'account_emailaddress' : 'timefortokens@auth.com',
            'password1' : 'thispasswordistherightlength',
            'password2': 'thispasswordistherightlength',
            }

        response = self.client.post(self.create_url, data, format='json')

        # get the last user created
        user = User.objects.latest('id')

        # get the token for that user
        token = Token.objects.get(user=user)

        #make sure that the token in the response is the user's token
        self.assertEqual(response.data['key'], token.key)


class LoginTests(APITestCase):
    def setUp(self):

        # Create a test user
        self.test_user = User.objects.create_user('testuser'
                                                  , 'test@example.com'
                                                  , 'testpassword')

        # # URL for creating an account.
        self.create_url = reverse('login')
        self.token = Token.objects.create(user=self.test_user)

    # tests must start with "test" or else Django will not find it
    def test_login_user(self):
        """
        Ensure we can login a user who already exists in the db
        """

        # the data to send to the server
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }

        # send the data to the server in json form with request POST
        response = self.client.post(self.create_url , data, format='json')

        # And that we're returning a 200 OK code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data['token']),188)

    def test_login_badusername(self):
        """
        If a user name is unrecognized then we get back a 401 Unauthorized
        """

        data = {
            'username': 'testuserbadusername',
            'password': 'testpassword'
        }

        # send the data to the server in json form with request POST
        response = self.client.post(self.create_url , data, format='json')

        # And that we're returning a 401 UNAUTH code.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_password(self):
        """
        If a users password is unrecognized then we get back a 401 Unauthorized
        """

        data = {
            'username': 'testuser',
            'password': 'testpasswordbadpassword'
        }

        # send the data to the server in json form with request POST
        response = self.client.post(self.create_url , data, format='json')

        # And that we're returning a 401 UNAUTH code.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


#class LogoutTests(APITestCase):
#    def setUp(self):

        # Create a test user
#        self.test_user = User.objects.create_user('testuser'
#                                                  , 'test@example.com'
#                                                  , 'testpassword')

        # see the urls.py file, this name is based on the 
#        self.create_url = reverse('rest_logout')

#    def test_logout_token(self):
#        """
#        if we are logged in we can log out and get a 200 OK response
#        """

#        client = APIClient()
#        client.login(username='testuser'
#                     , password='testpassword'
#                     , email='test@example.com')

#        response = client.post(self.create_url, {})

#        self.assertEqual(response.status_code, status.HTTP_200_OK)

#    def test_logout_not_logged_in(self):
#        """
#        If we try to logout a user who is not logged in then nothing happens
#        """

#        client = APIClient()
#        response = client.post(self.create_url, {})

#        self.assertEqual(response.status_code, status.HTTP_200_OK)
