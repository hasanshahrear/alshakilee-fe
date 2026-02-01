# Invoice Tracking QR Scanner

## Overview

This feature adds a floating action button with QR code scanning capability to the Invoice Tracking List page. Users can scan invoice QR codes to quickly track invoices using their mobile or desktop camera.

## Features

### 🎯 Key Functionality

- **Floating Action Button**: A beautiful blue gradient floating button positioned at the bottom-right corner
- **QR Code Scanner**: Opens a camera modal to scan invoice QR codes
- **Automatic Data Submission**: Extracts invoice ID from QR code and submits tracking data
- **User Session Integration**: Automatically uses current user's ID and employee type
- **Real-time Feedback**: Toast notifications for success/error states
- **Mobile Responsive**: Fully optimized for mobile devices

### 📱 User Experience

1. User clicks the floating QR scanner button
2. Camera modal opens with live video feed
3. User positions QR code within the frame
4. Scanner automatically detects and reads the QR code
5. Data is validated and submitted to the backend
6. Success/error notification is displayed
7. Invoice tracking list is refreshed

## Technical Implementation

### Components

#### `QrScannerModal`

- Uses `html5-qrcode` library for QR scanning
- Handles camera permissions
- Real-time QR code detection
- Error handling for camera access issues
- Clean camera shutdown on modal close

#### `InvoiceTrackingList` (Enhanced)

- Added floating action button with pulse animation
- Integrated QR scanner modal
- POST request to `/invoice-tracking/scan` endpoint
- Validation for user session and employee type
- Query invalidation for real-time list updates

### API Endpoint

**POST** `/invoice-tracking/scan`

**Payload:**

```json
{
  "invoiceId": 1,
  "userId": 5,
  "employeeTypeId": 3
}
```

**Fields:**

- `invoiceId`: Extracted from scanned QR code
- `userId`: Current logged-in user's ID from session
- `employeeTypeId`: Employee type ID from user's profile

### Styling

#### Floating Button

- Gradient background (blue-500 to blue-600)
- Pulse ring animation
- Shadow effects
- Hover and active states
- Mobile responsive positioning
- Loading state during scan

#### Scanner Modal

- Full-width on mobile (95vw)
- Centered on desktop (max 500px)
- Blue border around scanner
- Clean, minimalist design
- Camera status indicator
- Error state with retry button

### Dependencies

```json
{
  "html5-qrcode": "^2.3.8"
}
```

### Files Created/Modified

**New Files:**

- `qr-scanner-modal.component.tsx` - QR scanner modal component
- `scanner.css` - Custom styles for scanner and button

**Modified Files:**

- `invoice-tracking-list.component.tsx` - Added floating button and scanner integration
- `endpoints.ts` - Added `InvoiceTrackingScan` endpoint

## Usage

### For Users

1. Navigate to Invoice Tracking page
2. Click the blue QR scanner button (bottom-right)
3. Grant camera permissions when prompted
4. Scan the invoice QR code
5. Wait for success confirmation

### For Developers

#### Customizing QR Code Format

The scanner expects the QR code to contain a numeric invoice ID. To change the format, modify the `handleScan` function in `invoice-tracking-list.component.tsx`:

```typescript
const handleScan = async (invoiceIdStr: string) => {
  // Custom parsing logic here
  const invoiceId = parseInt(invoiceIdStr, 10);
  // ...
};
```

#### Changing Scanner Configuration

Modify scanner settings in `qr-scanner-modal.component.tsx`:

```typescript
const config = {
  fps: 10, // Scan frequency
  qrbox: { width: 250, height: 250 }, // Scan area size
  aspectRatio: 1.0, // Camera aspect ratio
};
```

## Error Handling

### Camera Access Denied

- Shows friendly error message
- Provides "Try Again" button
- Toast notification for user guidance

### Invalid QR Code

- Validates numeric invoice ID
- Shows error toast with clear message
- Allows user to retry

### User Session Issues

- Checks for active user session
- Validates employee type exists
- Clear error messages for missing data

### Network Errors

- Axios error handling
- Toast notifications
- Maintains scanner state

## Browser Compatibility

### Supported Browsers

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet
- ✅ Opera

### Requirements

- HTTPS (required for camera access)
- Camera permissions
- Modern browser with MediaDevices API support

## Mobile Optimization

### Responsive Features

- Adaptive button size (64px mobile, 72px desktop)
- Full-width scanner on mobile
- Touch-optimized button interactions
- Optimized camera resolution
- Reduced scanner frame on small screens

### Performance

- Lazy loading of scanner library
- Automatic camera cleanup
- Optimized re-renders
- Minimal bundle impact

## Security Considerations

### Camera Permissions

- Requests camera access only when needed
- Proper cleanup on component unmount
- No video recording or storage

### Data Validation

- Invoice ID validation (numeric only)
- User session verification
- Employee type validation
- Server-side validation recommended

## Future Enhancements

### Potential Features

- [ ] QR code generation for invoices
- [ ] Scan history
- [ ] Bulk scanning mode
- [ ] Offline queueing
- [ ] Scanner settings (torch, zoom)
- [ ] Multiple QR code formats
- [ ] Barcode support

## Troubleshooting

### Camera Not Working

1. Check HTTPS connection
2. Verify camera permissions in browser
3. Ensure no other app is using camera
4. Try different browser
5. Check browser console for errors

### QR Code Not Scanning

1. Ensure good lighting
2. Hold device steady
3. Check QR code quality
4. Adjust distance from camera
5. Verify QR code contains valid invoice ID

### Scan Not Submitting

1. Check user is logged in
2. Verify user has employee type
3. Check network connection
4. Review browser console for errors
5. Verify API endpoint is accessible

## Support

For issues or questions:

1. Check browser console for errors
2. Verify API endpoint is working
3. Test camera access in other apps
4. Review network requests in DevTools
5. Contact development team

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Maintained By**: Development Team
