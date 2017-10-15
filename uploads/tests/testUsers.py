from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase
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
        self.create_url = reverse('account-create')

    # tests must start with "test" or else Django will not find it
    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """

        # the data to send to the server
        data = {
            'username': 'someUser',
            'email': 'someUsersEmail@example.com',
            'password': 'someUsersPassword'
        }

        # send the data to the server in json form with request POST
        response = self.client.post(self.create_url , data, format='json')

        # make sure this is atlest two users in db, which we created above
        self.assertEqual(User.objects.count(), 2)

        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Additionally, we want to return the username and email upon successful
        # creation.
        self.assertEqual(response.data['username'], data['username'])
        self.assertEqual(response.data['email'], data['email'])
        self.assertFalse('password' in response.data)

    def test_create_user_with_short_pass(self):
        """
        Make sure that if a user tries to create an account with a password 
        that is shorter than the minimum, the creation will fail
        """

        data = {
            'username': 'ImDerpyUser',
            'email': 'derpuser@derpy.com',
            'password': 'smallpass'
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response password was empty
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_no_pass(self):
        """
        Make sure that if a user tries to create an account with no password,
        then the creation will fail
        """

        data = {
            'username': 'IdontlikePasswords',
            'email': 'WeShouldBeFreeAndOpen@foss.com',
            'password': ''
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response password was empty
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_long_name(self):
        """
        If a user tries to make an account with a name that is too long we
        prevent the account creation and return a bad request
        """

        data = {
            'username': 'ilikealongusername'*500,
            'email': 'WeShouldBeFreeAndOpen@foss.com',
            'password': 'longusername'
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
            'email': 'WeShouldBeFreeAndOpen@foss.com',
            'password': 'nousername'
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response username was empty
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_existing_name(self):
        """
        If a user tries to make an account with a name that already exists we
        prevent the account creation and return a bad request
        """

        data = {
            'username': 'testuser',
            'email': 'yetanotheremail@foss.com',
            'password': 'atotallyuniquepassword'
        }

        response = self.client.post(self.create_url , data, format='json')

        # make sure we get a bad request back from server
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # make sure the account wasn't created, but the one during setUp was
        self.assertEqual(User.objects.count(), 1)

        #make sure the response username was empty
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_preexisting_email(self):
        data = {
            'username': 'testuser2',
            'email': 'test@example.com',
            'password': 'testuser'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_invalid_email(self):
        data = {
            'username': 'foobarbaz',
            'email':  'testing',
            'passsword': 'foobarbaz'
        }


        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_no_email(self):
        data = {
                'username' : 'foobar',
                'email': '',
                'password': 'foobarbaz'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_new_user_with_auth_token(self):
        """
        Ensure that can create a new user, and that user gets an auth token
        generated for their account
        """

        data = {
            'username' : 'iwantatoken',
            'email' : 'timefortokens@auth.com',
            'password' : 'thispasswordistherightlength'
            }

        response = self.client.post(self.create_url, data, format='json')

        # get the last user created
        user = User.objects.latest('id')

        # get the token for that user
        token = Token.objects.get(user=user)

        #make sure that the token in the response is the user's token
        self.assertEqual(response.data['token'], token.key)
