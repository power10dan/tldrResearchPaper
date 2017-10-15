from rest_framework.permissions import BasePermission, SAFE_METHODS


class isAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:  # SAFE_METHODS:  GET, HEAD, OPTIONS
            return True
        else:
            return request.user.is_staff

