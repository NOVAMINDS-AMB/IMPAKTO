from django.contrib import admin
from.models import Activity
from django.utils.html import format_html

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('type', 'amount', 'timestamp', 'is_verified', 'thumbnail_preview')
    list_filter = ('type', 'is_verified', 'timestamp')
    search_fields = ('id', 'user__username')
    readonly_fields = ('thumbnail_preview',)

    def thumbnail_preview(self, obj):
        if obj.evidence_image:
            return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.evidence_image.url)
        return "No Evidence"
    
    thumbnail_preview.short_description = "Evidence Previe00w"
