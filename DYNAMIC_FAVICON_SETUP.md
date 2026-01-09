# Dynamic Favicon and Site Title Setup

This setup allows you to control the favicon and site title through your Wagtail CMS admin interface.

## How it works

1. **Frontend (React)**: The app fetches site settings from a Wagtail API endpoint
2. **Backend (Wagtail)**: Site settings are managed through the admin interface
3. **Dynamic Updates**: The favicon and title are updated in real-time when the page loads

## Frontend Implementation

### Files Created:
- `src/contexts/SiteSettingsContext.tsx` - React context for managing site settings
- `src/components/DynamicHead.tsx` - Component that updates favicon and title
- `src/types/site-settings.ts` - TypeScript types for site settings
- `src/config/api.ts` - API configuration
- `.env` - Environment variables for API URL

### Usage:
The `SiteSettingsProvider` wraps your entire app and the `DynamicHead` component automatically updates the favicon and title based on the API response.

## Backend Implementation (Wagtail)

### Required Steps:

1. **Create the Site Settings Model** (see `wagtail-backend-example.py`):
   ```python
   @register_setting
   class SiteSettings(BaseSiteSetting):
       favicon = models.ForeignKey(Image, ...)
       site_title = models.CharField(...)
   ```

2. **Create API Serializer**:
   ```python
   class SiteSettingsSerializer(serializers.ModelSerializer):
       favicon = ImageRenditionField('original', source='favicon')
   ```

3. **Create API View**:
   ```python
   @api_view(['GET'])
   def site_settings_api(request):
       # Return site settings as JSON
   ```

4. **Add URL Pattern**:
   ```python
   path('api/v2/site-settings/', site_settings_api)
   ```

## Configuration

### Environment Variables:
- `VITE_API_BASE_URL`: Your Wagtail backend URL (default: http://localhost:8000)

### API Endpoint:
The frontend expects the API to return:
```json
{
  "site_title": "Your Site Title",
  "favicon": {
    "url": "/media/images/favicon.png"
  }
}
```

## Admin Interface

Once set up, you can manage the favicon and site title through:
1. Wagtail Admin → Settings → Site Settings
2. Upload a favicon image (recommended: 32x32 or 16x16 pixels)
3. Set the site title
4. Save changes

The changes will be reflected immediately on your frontend without requiring a rebuild.

## Fallback Behavior

If the API is unavailable or returns an error:
- Site title falls back to "notary-app"
- Favicon falls back to "/vite.svg"

This ensures your site remains functional even if the backend is temporarily unavailable.