import functools
from flask.ext.login import current_user
from flask.ext.restful import abort


class require_permissions(object):
    def __init__(self, permissions):
        self.permissions = permissions

    def __call__(self, fn):
        @functools.wraps(fn)
        def decorated(*args, **kwargs):
            has_permissions = current_user.has_permissions(self.permissions)

            if has_permissions:
                return fn(*args, **kwargs)
            else:
                abort(403)

        return decorated


class require_groups(object):
    def __init__(self, groups):
        self.groups = groups

    def __call__(self, fn):
        @functools.wraps(fn)
        def decorated(*args, **kwargs):
            # has_groups = current_user.has_groups(self.groups)
            # has_groups = True

            if has_groups:
                return fn(*args, **kwargs)
            else:
                abort(403)

        return decorated


def require_permission(permission):
    return require_permissions((permission,))


def require_group(group):

    return require_groups((group))

