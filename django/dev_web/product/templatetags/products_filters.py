from django import template

register = template.Library()

@register.filter
def index(value, x):
    return value[x]
