# Cala Laiya Frontend (Static)

This folder contains the website UI, styles, scripts, image assets, and standalone bank-transfer details editor/display pages. The Render backend handles contact emails and sends reservation notifications when a guest submits booking details or payment proof.

## Edit public bank-transfer details

This package includes a static payment-details editor and a customer-facing display page:

- Open `payment-editor.html` to change the bank, account name, account number, and customer instructions. It starts with the Land Bank / Cala Laiya details supplied for this project.
- Check the customer preview, then select **Download updated settings**. This downloads a new `payment-details.js` file.
- Replace the existing `payment-details.js` in this project with the downloaded file, then redeploy the complete frontend to your static host.
- The customer display page is `payment-instructions.html` (for example, `https://your-site.example/payment-instructions.html`).

This is a static frontend: the editor cannot save directly to the hosting server, and changes in its preview are not public until you replace the settings file and redeploy. The clone's booking buttons now stay on this site and pass the selected room, dates, guest count, and listed rate to the payment page. This replaces the clone's handoff to the original site's checkout, but it does not connect to the original booking database, check availability, or confirm a reservation. The resort must confirm each request manually. Bank account details are public information when displayed to customers. Do not put passwords, API keys, or other secrets in `payment-details.js`.

The customer page asks for guest name, email, and phone, and creates a request reference. It emails those details and the selected stay information to the resort after the guest consents. The guest should wait for availability confirmation before transferring money. After payment, the guest can upload a JPG, PNG, WebP, or PDF proof (up to 5 MB); the backend emails it as an attachment. The page does not store booking records or confirm reservations.

## Connect to the backend

Deploy the matching backend ZIP to Render first. Then open **`api-config.js`** in this folder and paste the Render service URL in the clearly marked `CALA_API_BASE_URL` line. Use the service's base URL only, with no trailing slash. Keep Resend credentials in Render's backend environment settings, never in this frontend file.

After deploying the frontend to Vercel, set the backend's `CORS_ORIGINS` variable to the exact Vercel origin, such as `https://your-project.vercel.app` (no path or trailing slash), and redeploy/restart the backend if needed.

## Host the frontend

Upload the contents of this folder to your static host's publish root. The included `vercel.json` rewrites the clone's SPA routes (including `/booking`) to `index.html` while leaving the static `/payment-instructions.html` page accessible. On Vercel, deploy the frontend project using its normal static-site settings.
The room prices are in the `rooms` array near the top of `app.js`.
