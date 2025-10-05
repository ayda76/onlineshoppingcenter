from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_confirmation_email_order(order_id,user_email):
    subject='order confirmation'
    text=f'your order({order_id}) is placed in the system'
    return send_mail(subject,text,settings.DEFAULT_FROM_EMAIL,[user_email])