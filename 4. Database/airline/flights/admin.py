from django.contrib import admin
from .models import *
# Register your models here.
class FlightAdmin(admin.ModelAdmin):
    list_display = ("id", "origin", "destination", "duration")
admin.site.register(Airport)
admin.site.register(Flight, FlightAdmin)
class PassengerAdmin(admin.ModelAdmin):
    filter_horizontal = ("flights",)
admin.site.register(Passenger, PassengerAdmin)
