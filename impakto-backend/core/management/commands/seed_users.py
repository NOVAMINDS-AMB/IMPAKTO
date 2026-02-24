from django.core.management.base import BaseCommand
from core.models import User, MSMEProfile, MFIOfficerProfile

class Command(BaseCommand):
    help = 'Seeds the database with hardcoded Impakto frontend test users'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding database with test users...")

        # 1. Create MSME User 1 (No Active Loan)
        if not User.objects.filter(username='msmeuser1').exists():
            user1 = User.objects.create_user(
                username='msmeuser1',
                email='msmeuser1@gmail.com',
                password='password123', # Using a simple default password for testing
                first_name='msme',
                last_name='user1',
                phone_number='+254 712 345 678',
                role='msme'
            )
            MSMEProfile.objects.create(user=user1, has_active_loan=False)
            self.stdout.write(self.style.SUCCESS('Created MSME 1: msme user1'))

        # 2. Create MSME User 2 (Active Loan)
        if not User.objects.filter(username='msmeuser2').exists():
            user2 = User.objects.create_user(
                username='msmeuser2',
                email='msmeuser2@gmail.com',
                password='password123',
                first_name='msme',
                last_name='user2',
                phone_number='+254 723 456 789',
                role='msme'
            )
            MSMEProfile.objects.create(user=user2, has_active_loan=True)
            self.stdout.write(self.style.SUCCESS('Created MSME 2: msme user2'))

        # 3. Create MFI Admin (Jean-Paul)
        if not User.objects.filter(username='admin').exists():
            # MFI Admin needs is_staff=True to potentially access the Django admin later
            mfi_user = User.objects.create_user(
                username='admin',
                email='admin@impakto.com',
                password='impaktoadmin', # Matches the frontend hardcoded credentials
                first_name='MFI',
                last_name='Admin',
                phone_number='+1 234 567 8900',
                role='mfi_officer',
                is_staff=True 
            )
            MFIOfficerProfile.objects.create(
                user=mfi_user, 
                employee_id='EMP-2024-0042'
            )
            self.stdout.write(self.style.SUCCESS('Created MFI Officer: MFI Admin (admin)'))

        self.stdout.write(self.style.SUCCESS('Database seeding complete!'))