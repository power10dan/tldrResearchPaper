from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status


class AccountsTest(APITestCase):
    def setUp(self):

        # Create a test user
        self.test_user = User.objects.create_user('testuser'
                                                  , 'test@example.com'
                                                  , 'testpassword')

        # # URL for creating an account.
        self.create_url = reverse('account-create')

    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            'username': 'foo',
            'email': ' foobar@example.com',
            'password': 'somepassword'
        }

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
