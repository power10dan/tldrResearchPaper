from django.db import models


class User(models.Model):
    """
    User Model
    Defines attributes of a user
    """

    # These are field for the model. Each field will map to a DB column
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # a simple method, not sure if we need getters or setters yet
    def get_name(self):
        return self.name
