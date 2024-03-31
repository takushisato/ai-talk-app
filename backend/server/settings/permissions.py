from rest_framework import permissions


"""
取得から編集まで、全ての操作権限がオブジェクトの所有者（もしくはスーパーユーザー）のみに与えられるパーミッションクラス

"""
class IsOwnerOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return obj.user == request.user

        if hasattr(obj, 'user'):
            return obj.user == request.user or request.user.is_superuser
        elif obj == request.user:
            return True
        else:
            return False
