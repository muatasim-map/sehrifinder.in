
-- SEED DATA: CHENNAI 2026 FINAL
-- Generated from data/chennai.ts
-- Includes address and last_verified columns

-- 1. Schema Updates (Idempotent)
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS last_verified text;

-- 2. Clean up old Chennai data
DELETE FROM public.spots WHERE city = 'Chennai';

-- 3. Insert New Data
INSERT INTO public.spots (
  location_id, venue_name, city, primary_area, venue_type, food_type, 
  timing, availability, address, landmark, features, latitude, longitude, phones, contact_persons, notes, last_verified
) VALUES 
(1, 'Hotel Topper', 'Chennai', 'Adyar', 'Hotel', 'Paid', '{"start":"03:00","end":"04:00"}', NULL, 'Near Adyar bus depot, Masjid Campus', 'Near Adyar bus depot, Masjid Campus', NULL, 13.0012, 80.2565, NULL, NULL, NULL, '2026'),
(2, 'Hotel Liberty', 'Chennai', 'Guindy', 'Hotel', 'Paid', '{"start":"03:30","end":"04:30"}', NULL, '#64, Anna Salai, Near Guindy Railway Station', '#64, Anna Salai, Near Guindy Railway Station', NULL, 13.0067, 80.2206, '{"044-22317400"}', NULL, NULL, '2026'),
(3, 'Alandur Masjid (Masjid-E-Ahle Hadees)', 'Chennai', 'Alandur', 'Masjid', 'Free', '{"start":"03:00","end":"04:30"}', 'Last 5 Odd Nights', NULL, NULL, '{"LimitedDays"}', 12.9975, 80.2006, NULL, NULL, NULL, '2026'),
(4, 'AKR Trust', 'Chennai', 'Guindy', 'Organization', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, NULL, 13.01, 80.22, NULL, NULL, NULL, '2026'),
(6, 'Kodambakkam Monthly Sahar', 'Chennai', 'Kodambakkam', 'Private Arrangement', 'Paid', NULL, NULL, NULL, NULL, '{"PreBookingRequired","Subscription"}', 13.052, 80.225, '{"9176807107"}', NULL, 'Advance registration required. Contact for timing.', '2026'),
(7, 'FB Masjid', 'Chennai', 'Nandanam', 'Masjid', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"PreBookingRequired"}', 13.0628, 80.2643, NULL, NULL, 'Register your name during Asar prayer.', '2026'),
(10, 'Dasthgir Sahib Jama Masjid', 'Chennai', 'Saidapet', 'Masjid', 'Free', NULL, NULL, NULL, NULL, NULL, 13.0124, 80.2316, '{"9003231307"}', '{"Br. Sameeruddin"}', NULL, '2026'),
(56, 'Masjid Mubarak Sahar Meal', 'Chennai', 'Avadi', 'Masjid', 'Free', '{"start":"03:00","end":"04:15"}', NULL, NULL, NULL, '{"PreBookingRequired","DeliveryAvailable"}', 13.109, 80.105, '{"9094560414","9710243600"}', '{"Abdul Aziz"}', 'Pre-registration must. Arranged for the poor and travelers.', '2026'),
(57, 'Kolathur Sahar Friends Group', 'Chennai', 'Kolathur', 'Organization', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"PreBookingRequired","HospitalSupport","DeliveryAvailable"}', 13.124, 80.2121, '{"8428377778"}', NULL, 'Pre-registration must. Home delivery for workers & hospital visitors.', '2026'),
(58, 'Mandaiveli Eidgah Sahar', 'Chennai', 'Mandaiveli', 'Masjid', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"PreBookingRequired","DeliveryAvailable"}', 13.0292, 80.2653, '{"9840290766"}', NULL, 'Pre-registration is required for this home-delivered Sahur meal.', '2026'),
(63, 'Masjid-e-Anwari Sahar', 'Chennai', 'Tambaram/Sembakkam', 'Masjid', 'Paid', '{"start":"03:00"}', NULL, NULL, NULL, '{"PreBookingRequired","Subscription","DeliveryAvailable"}', 12.9219, 80.1544, '{"9884193210"}', NULL, 'Pre-registration must. Full Ramadan Sahur package available for delivery.', '2026'),
(65, 'Al Jabbar Sahar Meal', 'Chennai', 'Teynampet', 'Foundation', 'Free', '{"start":"02:30","end":"04:00"}', NULL, NULL, NULL, '{"PreBookingRequired","TokenRequired","DeliveryAvailable"}', 13.0418, 80.2341, '{"9940321781"}', NULL, 'Pre-registration is mandatory. Tokens were issued Feb 14-16.', '2026'),
(66, 'Ar-Rahman Islamic Taqwa Center', 'Chennai', 'Chromepet', 'Foundation', 'Free', '{"start":"23:00","end":"23:30"}', NULL, NULL, NULL, '{"LateNightMeal","DeliveryAvailable","PreBookingRequired"}', 12.9467, 80.1475, '{"9941234386"}', NULL, 'Free sahur parcel delivered nightly after Taraweeh prayer. Pre-registration required.', '2026'),
(72, 'Abuthahir Home Delivery', 'Chennai', 'Poonamallee', 'Private Arrangement', 'Free', '{"start":"02:30"}', NULL, NULL, NULL, '{"DeliveryAvailable"}', 13.05, 80.1, '{"9751092890"}', '{"Abuthahir"}', 'Home delivery open for all in the Poonamallee area.', '2026'),
(74, 'Al-Jamiatul Kamaliyah Sahar Meal', 'Chennai', 'Kaladipet', 'Organization', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"PreBookingRequired","HospitalSupport","DeliveryAvailable"}', 13.16, 80.3, '{"9841195318"}', NULL, 'Pre-registration is required. Delivery for students, workers & hospital guests.', '2026'),
(75, 'Alfatah Dawa Center Sahar', 'Chennai', 'Perungudi', 'Organization', 'Free', '{"start":"23:00","end":"24:00"}', NULL, NULL, NULL, '{"LateNightMeal","LadiesFriendly","DeliveryAvailable"}', 12.965, 80.245, '{"9551711510"}', NULL, 'Provided after Taraweeh. Delivered to workplaces & hostels, with support for ladies.', '2026'),
(78, 'Ar Rahman Hotel', 'Chennai', 'Pallavaram', 'Restaurant', 'Free', NULL, NULL, NULL, NULL, '{"ParcelPickup","PreBookingRequired"}', 12.97, 80.14, NULL, NULL, 'Strictly Parcel Pickup only. Pre-registration is a must.', '2026'),
(79, 'Avadi Sahar (Sai Nagar)', 'Chennai', 'Avadi', 'Private Arrangement', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"DeliveryAvailable"}', 13.11, 80.1, '{"8940753018"}', NULL, 'Open for all. Home delivery provided.', '2026'),
(95, 'Masjid e Hussainy', 'Chennai', 'Royapettah', 'Masjid', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"DeliveryAvailable"}', 13.05, 80.26, '{"8870065124"}', '{"Ali Waris"}', 'Home delivery is available.', '2026'),
(100, 'Masjidun Noor ECR Sahar', 'Chennai', 'Pudupattinam', 'Masjid', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"PreBookingRequired","DeliveryAvailable"}', 12.55, 80.16, '{"9894239866"}', NULL, 'Pre-registration must for free Sahur meal delivery.', '2026'),
(104, 'Paramakudi Bismillah Hotel', 'Chennai', 'Pallavaram', 'Restaurant', 'Free', NULL, NULL, NULL, NULL, '{"TokenRequired","ParcelPickup"}', 12.97, 80.14, '{"9884996686"}', NULL, 'Please collect a token before Isha prayer. Parcel pickup only.', '2026'),
(107, 'Ramapuram Sahur Parcel', 'Chennai', 'Ramapuram', 'Private Arrangement', 'Free', '{"start":"02:30","end":"04:00"}', NULL, NULL, NULL, '{"ParcelPickup","PreBookingRequired"}', 13.03, 80.18, '{"9047217378"}', NULL, 'Pre-registration must. Parcel pickup only.', '2026'),
(108, 'Sahar Meal Arrangement (Thiru.V.K. Nagar)', 'Chennai', 'Perambur', 'Private Arrangement', 'Paid', NULL, NULL, NULL, NULL, '{"PreBookingRequired","HospitalSupport","DeliveryAvailable"}', 13.12, 80.23, '{"9791094468"}', '{"Mr. Asif Sahib"}', 'Registration required before Asr daily. Delivery for expats, students, and hospital patients.', '2026'),
(111, 'Suhoor Food Initiative for Ladies', 'Chennai', 'OMR (Perungudi to Siruseri)', 'Organization', 'Free', NULL, NULL, NULL, NULL, '{"LadiesFriendly","DeliveryAvailable","PreBookingRequired"}', 12.9, 80.23, '{"9342391015"}', NULL, 'Only for sisters staying in PG or alone. Delivery covers Perungudi to Siruseri.', '2026'),
(112, 'Umar Hussain – Madras Medical College', 'Chennai', 'Park Town', 'Organization', 'Free', '{"start":"03:30"}', NULL, NULL, NULL, '{"LadiesFriendly"}', 13.08, 80.275, '{"9182919517"}', NULL, 'Located at MMC Campus. Strictly for Girls Only.', '2026'),
(114, 'Zaara – Masjid-e-Hameedia', 'Chennai', 'Ramapuram', 'Masjid', 'Free', '{"start":"04:15"}', NULL, NULL, NULL, '{"ParcelPickup","PreBookingRequired"}', 13.03, 80.18, NULL, NULL, 'Booking is required for this parcel-pickup service.', '2026'),
(52, 'TNTJ Sehri – Omandur Hospital', 'Chennai', 'Egmore', 'Foundation', 'Free', '{"start":"03:00"}', NULL, NULL, NULL, '{"HospitalSupport","PreBookingRequired"}', NULL, NULL, NULL, NULL, 'Organized by TNTJ for hospital patients and families. Pre-booking at 15:00.', '2025'),
(53, 'TNTJ Sehri – Gosha Hospital', 'Chennai', 'Egmore', 'Foundation', 'Free', '{"start":"03:00"}', NULL, NULL, NULL, '{"HospitalSupport","PreBookingRequired"}', NULL, NULL, NULL, NULL, 'Organized by TNTJ for hospital patients and families. Pre-booking at 15:00.', '2025'),
(54, 'TNTJ Sehri – Egmore Maternity Hospital', 'Chennai', 'Egmore', 'Foundation', 'Free', '{"start":"03:00"}', NULL, NULL, NULL, '{"HospitalSupport","PreBookingRequired"}', NULL, NULL, NULL, NULL, 'Organized by TNTJ for hospital patients and families. Pre-booking at 15:00.', '2025'),
(62, 'Masjid-e-Noor (Sothupakkam)', 'Chennai', 'Madhavaram', 'Masjid', 'Free', '{"start":"03:00","end":"04:00"}', NULL, NULL, NULL, '{"DisabledSupport","HospitalSupport","ParcelPickup","LateNightMeal","DeliveryAvailable"}', NULL, NULL, NULL, NULL, 'Booking: 10:00–18:00. Doorstep delivery for physically challenged. Takeaway: 22:15-23:00.', '2025'),
(64, 'MGM Classy Men''s Hostel (OMR)', 'Chennai', 'Karapakkam', 'Hostel', 'Free', '{"start":"23:00","end":"01:00"}', NULL, NULL, NULL, '{"LateNightMeal","LadiesFriendly","DeliveryAvailable","PreBookingRequired"}', NULL, NULL, NULL, NULL, 'Booking: 10:00–17:00. Doorstep delivery for women in PGs/Hostels. Bring container.', '2025'),
(68, 'Sahabas of Badr Memorial (Padi Masjid)', 'Chennai', 'Padi', 'Masjid', 'Free', NULL, NULL, NULL, NULL, '{"PreBookingRequired"}', 13.1014, 80.1906, NULL, NULL, 'Pre-booking required. An identity card will be issued by the masjid office.', '2025');
