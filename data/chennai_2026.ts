import { RawSehriSpot } from "../types";

export const CHENNAI_2026_DATA: RawSehriSpot[] = [
    // 1. 5PM Café
    {
        location_id: 101,
        venue_name: "5PM Café",
        city: "Chennai",
        primary_area: "Pallavakkam",
        address: "Fifth Chennai in Pallavakkam (21, F Beach Road, MGR Salai)",
        venue_type: "Cafe",
        food_type: "Paid",
        availability: "Time not available",
        features: ["Paid", "Cafe"]
    },
    // 2. Aaga Mohideen Masjid
    {
        location_id: 102,
        venue_name: "Aaga Mohideen Masjid",
        city: "Chennai",
        primary_area: "Mylapore",
        address: "Mosque St, Alamelu Manga Puram, Sankarapuram, Mylapore, Chennai – 600004",
        venue_type: "Masjid",
        food_type: "Free",
        availability: "Last 10 Days",
        features: ["Free", "Masjid", "LimitedDays"]
    },
    // 3. Abuthahir (Home Delivery)
    {
        location_id: 103,
        venue_name: "Abuthahir Sehri Service",
        city: "Chennai",
        primary_area: "Poonamallee",
        address: "Poonamallee, Chennai",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "02:30" },
        contact_persons: ["Abuthahir"],
        phones: ["9751092890"],
        features: ["Free", "Delivery", "OpenForAll"]
    },
    // 4. AKR Trust (Matches ID 4)
    {
        location_id: 4,
        venue_name: "AKR Trust",
        city: "Chennai",
        primary_area: "Guindy",
        locality: "Guindy Market",
        address: "Near Gandhi statue, Guindy Market, Chennai – 600032",
        venue_type: "Organization",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        availability: "Entire Ramadan",
        features: ["Free", "Trust"]
    },
    // 5. Al Jabbar Sahar Meal (Matches ID 65 approx, but keeping separate to be safe or updating)
    // ID 65 was "Al Jabbar Foundation...". Let's update ID 65 logic.
    {
        location_id: 65,
        venue_name: "Al Jabbar Sahar Meal",
        city: "Chennai",
        primary_area: "Teynampet",
        address: "41 Sarojini Street, Usman Road (Near Al Jabbar Restaurant), Chennai - 600017",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "02:30", end: "04:00" },
        phones: ["9940321781"],
        notes: "Pre-registration must | Token issued February 14-16",
        latitude: 13.0418, // Preserved from old data
        longitude: 80.2341,
        features: ["Free", "Delivery", "TokenRequired"]
    },
    // 6. Al Minar
    {
        location_id: 104,
        venue_name: "Al Minar",
        city: "Chennai",
        primary_area: "Triplicane",
        address: "No.34, Triplicane High Rd, Ellis Puram, Padupakkam, Triplicane, Chennai – 600005",
        venue_type: "Masjid",
        food_type: "Free",
        phones: ["4448656116"],
        features: ["Free", "Masjid"]
    },
    // 7. Al-Jamiatul Kamaliyah
    {
        location_id: 105,
        venue_name: "Al-Jamiatul Kamaliyah Sahar Meal",
        city: "Chennai",
        primary_area: "Kaladipet",
        address: "No. 0/4 Poongavanapuram Main Road, Kaladipet, Chennai - 600019",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        phones: ["9841195318"],
        notes: "Pre-registration must | For students/workers/hospital guests",
        features: ["Free", "Delivery", "RegistrationRequired"]
    },
    // 8. Alfatah Dawa Center
    {
        location_id: 106,
        venue_name: "Alfatah Dawa Center Sahar",
        city: "Chennai",
        primary_area: "Perungudi",
        address: "No. 2 Valmiki Street, Thiruvalluvar Nagar, Perungudi, Chennai - 600096",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "23:00", end: "00:00" },
        phones: ["9551711510"],
        notes: "Provided after taraweeh | Delivered to workplaces/hostels for paid for ladies",
        features: ["Free", "Delivery", "WomenSupport"]
    },
    // 9. Althaf Food Court
    {
        location_id: 107,
        venue_name: "Althaf Food Court",
        city: "Chennai",
        primary_area: "Saidapet",
        address: "9/5, Taluk Office Rd, Little Mount, Saidapet, Chennai 600015",
        venue_type: "Food Court",
        food_type: "Free",
        phones: ["7305814763"],
        features: ["Free", "FoodCourt"]
    },
    // 10. Anju Light Mosque
    {
        location_id: 108,
        venue_name: "Anju Light Mosque",
        city: "Chennai",
        primary_area: "Rangarajapuram",
        address: "Near Rangarajapuram Bridge, Rangarajapuram, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 11. Ar Rahman Hotel
    {
        location_id: 109,
        venue_name: "Ar Rahman Hotel",
        city: "Chennai",
        primary_area: "Pallavaram",
        address: "No.135, Mosque Street, K. Pallavaram, Chennai - 600043 (Opposite Saiwa Kitchen)",
        venue_type: "Hotel",
        food_type: "Free",
        notes: "Parcel only. Pre-registration must, call to verify.",
        features: ["Free", "ParcelOnly"]
    },
    // 12. Ar-Rahman Islamic Taqwa Center (Matches ID 66/792)
    {
        location_id: 66,
        venue_name: "Ar-Rahman Islamic Taqwa Center (ARITC)",
        city: "Chennai",
        primary_area: "Chromepet",
        address: "57/58, Lakshmi Nagar, 2nd Cross Street, Heena Tower, Chromepet, Chennai - 600044",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "23:00", end: "23:30" },
        phones: ["9941234386"],
        notes: "Pre-registration must | Free sahur parcel nightly",
        latitude: 12.9467,
        longitude: 80.1475,
        features: ["Free", "Delivery", "Parcel"]
    },
    // 13. Avadi (Matches ID 56? No, 56 is Masjid-e-Mubarak. This seems different "Sai Nagar Plot")
    {
        location_id: 110,
        venue_name: "Avadi Sehri Service",
        city: "Chennai",
        primary_area: "Ambattur",
        address: "Sai Nagar Plot, 14, 3rd Main Rd, near Telephone Exchange, Old Ambattur",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        phones: ["8940753018"],
        notes: "Open for All",
        features: ["Free", "Delivery"]
    },
    // 14. Azad Nagar Masjid (Matches ID 37? "Masjid-e-Quba" is Aminjikarai Azad Nagar 1st St. This is Choolaimedu. Different.)
    {
        location_id: 111,
        venue_name: "Azad Nagar Masjid",
        city: "Chennai",
        primary_area: "Choolaimedu",
        address: "Maraimalai St, Ayyavoo Colony, Choolaimedu, Chennai – 600030",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 15. Basha Street Masjid
    {
        location_id: 112,
        venue_name: "Basha Street Masjid",
        city: "Chennai",
        primary_area: "Choolaimedu",
        address: "Choolaimedu Main Road, Chennai - 600094",
        venue_type: "Masjid",
        food_type: "Paid", // Check user text "Dine In ... Only for last 10 days"
        timing: { start: "03:00", end: "04:00" },
        phones: ["1234567890"], // User provided dummy?
        availability: "Only for last 10 days",
        features: ["Paid? or details not updated", "Masjid", "LimitedDays"]
    },
    // 16. BBB Nisha Trust
    {
        location_id: 113,
        venue_name: "BBB Nisha Trust",
        city: "Chennai",
        primary_area: "Palavakkam",
        address: "No 76, Near Corporation Bank, VGP Layout Part 1, 2nd Main Road, Palavakkam, Chennai – 600041",
        venue_type: "Organization",
        food_type: "Free",
        phones: ["9445253385"],
        features: ["Free", "Trust"]
    },
    // 17. Big Mosque (Washermanpet) - Matches ID 27
    {
        location_id: 27,
        venue_name: "Big Mosque (Washermanpet)",
        city: "Chennai",
        primary_area: "Washermanpet",
        address: "Washermanpet Main Road, Washermanpet, Chennai – 600021",
        venue_type: "Masjid",
        food_type: "Free",
        latitude: 13.1072,
        longitude: 80.2867,
        features: ["Free", "Masjid"]
    },
    // 18. Big Mosque Royapuram - Matches ID 34
    {
        location_id: 34,
        venue_name: "Big Mosque Royapuram",
        city: "Chennai",
        primary_area: "Royapuram",
        address: "Royapuram Main Road, Royapuram, Chennai – 600013",
        venue_type: "Masjid",
        food_type: "Free",
        latitude: 13.1083,
        longitude: 80.2942,
        features: ["Free", "Masjid"]
    },
    // 19. Bilal - Kebabs & Biryani Perungudi
    {
        location_id: 114,
        venue_name: "Bilal - Kebabs & Biryani (Perungudi)",
        city: "Chennai",
        primary_area: "Perungudi",
        address: "18, Ramappa Nagar Main Road, Perungudi, Chennai – 600096",
        venue_type: "Restaurant",
        food_type: "Free",
        timing: { start: "02:45" },
        notes: "Free Sahar available during Ramadan, Perungudi branch. Call ahead.",
        features: ["Free", "Restaurant"]
    },
    // 20. Bilal at ECR Restaurant
    {
        location_id: 115,
        venue_name: "Bilal at ECR Restaurant",
        city: "Chennai",
        primary_area: "ECR / Palavakkam",
        address: "1/174, East Coast Road (ECR), Palavakkam, Chennai – 600041",
        venue_type: "Restaurant",
        food_type: "Free",
        timing: { start: "02:45" },
        notes: "Free Sahar available during Ramadan at ECR branch.",
        features: ["Free", "Restaurant"]
    },
    // 21. Chennai Foodbank
    {
        location_id: 116,
        venue_name: "Chennai Foodbank",
        city: "Chennai",
        primary_area: "Teynampet",
        address: "Chennai Foodbank, Teynampet, Chennai – 600018",
        venue_type: "Organization",
        food_type: "Free",
        features: ["Free", "NGOSupport"]
    },
    // 22. Coronet Hotel
    {
        location_id: 117,
        venue_name: "Coronet Hotel",
        city: "Chennai",
        primary_area: "Palavakkam",
        address: "Near Palavakkam Big Masjid, Palavakkam, Chennai – 600041",
        venue_type: "Hotel",
        food_type: "Free",
        phones: ["044-43861066"],
        notes: "Coupon Required",
        features: ["Free", "Hotel", "CouponRequired"]
    },
    // 23. Dasthgir Sahib Jama Masjid - Matches ID 10
    {
        location_id: 10,
        venue_name: "Dasthgir Sahib Jama Masjid",
        city: "Chennai",
        primary_area: "Saidapet",
        address: "Br. Sameeruddin Street, Saidapet, Chennai – 600015",
        venue_type: "Masjid",
        food_type: "Free",
        availability: "Entire Ramadan",
        contact_persons: ["Br. Sameeruddin"],
        phones: ["9003231307"],
        latitude: 13.0124,
        longitude: 80.2316,
        features: ["Free", "Masjid"]
    },
    // 24. Dubai Kitchen
    {
        location_id: 118,
        venue_name: "Dubai Kitchen",
        city: "Chennai",
        primary_area: "Neelankarai",
        address: "4/131, SH 49, Saraswathi Nagar, Neelankarai, Chennai – 600115",
        venue_type: "Restaurant",
        food_type: "Free",
        phones: ["9841595523"],
        features: ["Free", "Restaurant"]
    },
    // 25. FB Masjid - Matches ID 7
    {
        location_id: 7,
        venue_name: "FB Masjid",
        city: "Chennai",
        primary_area: "Nandanam",
        address: "Opp. YMCA Ground, Nandanam, Chennai – 600035",
        venue_type: "Masjid",
        food_type: "Free",
        notes: "Register during Asar",
        latitude: 13.0628,
        longitude: 80.2643,
        features: ["Free", "Masjid"]
    },
    // 26. Firdowz Triplicane
    {
        location_id: 119,
        venue_name: "Firdowz Triplicane",
        city: "Chennai",
        primary_area: "Triplicane",
        address: "No 307, Triplicane High Rd, SVM Nagar, Padupakkam, Triplicane, Chennai – 600005",
        venue_type: "Restaurant",
        food_type: "Paid",
        timing: { start: "03:00", end: "04:00" },
        phones: ["4442157174"],
        features: ["Paid", "Restaurant"]
    },
    // 27. Gandhi Market Masjid - Matches ID 5
    {
        location_id: 5,
        venue_name: "Gandhi Market Masjid",
        city: "Chennai",
        primary_area: "Saidapet West",
        address: "Gandhi Market Area, Saidapet West, Chennai – 600015",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        latitude: 13.0102,
        longitude: 80.2157,
        features: ["Free", "Masjid"]
    },
    // 28. Hameed Fathima Jumma Masjid - Matches ID 49 ("Masjid-e-Hameedia")? No, "Sipcot Siruseri".
    {
        location_id: 120,
        venue_name: "Hameed Fathima Jumma Masjid",
        city: "Chennai",
        primary_area: "Sipcot Siruseri",
        address: "Sipcot Siruseri, Chennai",
        venue_type: "Masjid",
        food_type: "Paid",
        notes: "Parcel after Taraweeh | ₹130 Per Day, Registration Mandatory",
        phones: ["9786038530"],
        features: ["Paid", "Masjid", "RegistrationRequired"]
    },
    // 29. Hotel Barkath - Matches ID 25
    {
        location_id: 25,
        venue_name: "Hotel Barkath",
        city: "Chennai",
        primary_area: "Royapettah",
        address: "Royapettah, Chennai",
        venue_type: "Restaurant",
        food_type: "Paid",
        timing: { start: "03:00", end: "04:00" },
        latitude: 13.0539,
        longitude: 80.2641,
        features: ["Paid", "Restaurant"]
    },
    // 30. Hotel Buhari - Matches ID 26
    {
        location_id: 26,
        venue_name: "Hotel Buhari (Mount Road)",
        city: "Chennai",
        primary_area: "Mount Road",
        address: "Mount Road, Chennai",
        venue_type: "Restaurant",
        food_type: "Paid",
        timing: { start: "03:00", end: "04:00" },
        latitude: 13.0638,
        longitude: 80.2652,
        features: ["Paid", "Restaurant"]
    },
    // 31. Hotel Fanar - Matches ID 9
    {
        location_id: 9,
        venue_name: "Hotel Fanar",
        city: "Chennai",
        primary_area: "Periamet",
        address: "Opp Peryamet Masjid, Periamet, Chennai – 600081",
        venue_type: "Hotel",
        food_type: "Paid",
        latitude: 13.0827,
        longitude: 80.2707,
        features: ["Paid", "Hotel"]
    },
    // 32. Hotel Liberty - Matches ID 2
    {
        location_id: 2,
        venue_name: "Hotel Liberty",
        city: "Chennai",
        primary_area: "Guindy",
        address: "#64, Anna Salai, Near Guindy Railway Station, Guindy, Chennai – 600032",
        venue_type: "Hotel",
        food_type: "Paid",
        phones: ["044-22317400"],
        latitude: 13.0067,
        longitude: 80.2206,
        features: ["Paid", "Hotel"]
    },
    // 33. Hotel Mubarak - Matches ID 41
    {
        location_id: 41,
        venue_name: "Hotel Mubarak",
        city: "Chennai",
        primary_area: "Chrompet",
        address: "Chrompet, Chennai",
        venue_type: "Restaurant",
        food_type: "Paid",
        timing: { start: "03:00", end: "04:00" },
        features: ["Paid", "Restaurant"]
    },
    // 34. Hotel Nei Soru
    {
        location_id: 121,
        venue_name: "Hotel Nei Soru",
        city: "Chennai",
        primary_area: "Ramapuram",
        address: "2/1, Ponnusamy St, Shanthi Nagar, Ramapuram, Chennai – 600089",
        venue_type: "Hotel",
        food_type: "Free",
        phones: ["9884215786"],
        features: ["Free", "Hotel"]
    },
    // 35. Hotel Southern Comfort
    {
        location_id: 122,
        venue_name: "Hotel Southern Comfort",
        city: "Chennai",
        primary_area: "Meenambakkam",
        address: "Old Station Road, 5, Grand Southern Trunk Rd, Meenambakkam, Chennai – 600016",
        venue_type: "Hotel",
        food_type: "Paid",
        features: ["Paid", "Hotel"]
    },
    // 36. Hotel Topper - Matches ID 1
    {
        location_id: 1,
        venue_name: "Hotel Topper",
        city: "Chennai",
        primary_area: "Adyar",
        address: "Near Adyar bus depot, Masjid Campus, Adyar, Chennai – 600020",
        venue_type: "Hotel",
        food_type: "Paid",
        latitude: 13.0012,
        longitude: 80.2565,
        features: ["Paid", "Hotel"]
    },
    // 37. Hotel Virudhunagar Restaurant - Matches ID 14
    {
        location_id: 14,
        venue_name: "Hotel Virudhunagar Restaurant",
        city: "Chennai",
        primary_area: "T Nagar",
        address: "PANAGAL PARK, 77, Gopathy Narayana Rd, T. Nagar, Chennai, Tamil Nadu 600017",
        venue_type: "Hotel",
        food_type: "Paid", // Updated from ID 14 (which said Free - check user text: "Pls contact... to get sahar food"). User says "Not specified".
        timing: { start: "02:30" },
        notes: "Pre-registration must, call to verify.",
        latitude: 13.0418,
        longitude: 80.2341,
        features: ["Hotel", "RegistrationRequired"]
    },
    // 38. Irfan Bhai - Hotel
    {
        location_id: 123,
        venue_name: "Irfan Bhai – Hotel",
        city: "Chennai",
        primary_area: "Unknown",
        address: "Address missing",
        venue_type: "Hotel",
        food_type: "Free",
        features: ["Free", "Hotel"]
    },
    // 39. Jacob Kitchen
    {
        location_id: 124,
        venue_name: "Jacob Kitchen",
        city: "Chennai",
        primary_area: "Nungambakkam",
        address: "Nungambakkam Main Road, Nungambakkam, Chennai – 600034",
        venue_type: "Hotel",
        food_type: "Free",
        features: ["Free", "Hotel"]
    },
    // 40. Jumma Masjid (Guduvanchery)
    {
        location_id: 125,
        venue_name: "Jumma Masjid (Guduvanchery)",
        city: "Chennai",
        primary_area: "Guduvanchery",
        address: "Opp. Guduvanchery Bus Stand, Guduvanchery, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        phones: ["9345760906"],
        availability: "Entire Ramadan",
        features: ["Free", "Masjid"]
    },
    // 41. Kodambakkam Monthly Sahar - Matches ID 6 ("Private Arrangement")?
    {
        location_id: 6,
        venue_name: "Kodambakkam Monthly Sahar",
        city: "Chennai",
        primary_area: "Kodambakkam",
        address: "Opp. Sekar Emporium, Kodambakkam, Chennai",
        venue_type: "Masjid",
        food_type: "Paid",
        phones: ["9176807107"],
        notes: "₹1000 Monthly",
        features: ["Paid", "Masjid", "Subscription"]
    },
    // 42. Kolathur Sahar Friends Group - Matches ID 57
    {
        location_id: 57,
        venue_name: "Kolathur Sahar Friends Group",
        city: "Chennai",
        primary_area: "Kolathur",
        address: "Samdaria Colony, Kolathur, Chennai - 600099",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        phones: ["8428377778"],
        notes: "Pre-registration must | Sahur for workers/hospital visitors",
        latitude: 13.1240,
        longitude: 80.2121,
        features: ["Free", "Delivery"]
    },
    // 43. Madina Masjid
    {
        location_id: 126,
        venue_name: "Madina Masjid",
        city: "Chennai",
        primary_area: "Kannagi Nagar Thoraipakkam",
        address: "740/749, Kannagi Nagar, Thoraipakkam, Tamil Nadu 600097",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:30", end: "04:30" },
        contact_persons: ["Shahul Hameed"],
        phones: ["9840124631"],
        notes: "Kindly register yourself. Food available from 4 AM.",
        features: ["Free", "Masjid", "DineIn"]
    },
    // 44. Madrasathul Haadi
    {
        location_id: 127,
        venue_name: "Madrasathul Haadi",
        city: "Chennai",
        primary_area: "Medavakkam",
        address: "United Colony, Vengaivasal, Medavakkam, Chennai – 600100",
        venue_type: "Masjid",
        food_type: "Free",
        phones: ["8608602737"],
        features: ["Free", "Masjid"]
    },
    // 45. Mandaiveli Eidcah Masjid - Matches ID 58
    {
        location_id: 58,
        venue_name: "Mandaiveli Eidcah Masjid",
        city: "Chennai",
        primary_area: "Mandaiveli",
        address: "No:32, Mandaveli, street Marys Road, Jeth Nagar, Chennai-600028",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00" },
        phones: ["9840290766"],
        latitude: 13.0292,
        longitude: 80.2653,
        features: ["Free", "Masjid"]
    },
    // 46. Market Palli
    {
        location_id: 128,
        venue_name: "Market Palli",
        city: "Chennai",
        primary_area: "Saidapet West",
        address: "Pookkara Theru (Canara Bank St), Saidapet West, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 47. Market Palli Guduvanchery
    {
        location_id: 129,
        venue_name: "Market Palli Guduvanchery",
        city: "Chennai",
        primary_area: "Guduvanchery",
        address: "Opp. Guduvanchery Bus Stand",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00" },
        phones: ["1234567890"],
        availability: "Entire month",
        features: ["Free", "Masjid"]
    },
    // 48. Masjid (Choolaimedu)
    {
        location_id: 130,
        venue_name: "Masjid (Choolaimedu)",
        city: "Chennai",
        primary_area: "Choolaimedu",
        address: "Choolaimedu Main Road, Choolaimedu, Chennai – 600094",
        venue_type: "Masjid",
        food_type: "Free",
        availability: "Last 10 Days",
        features: ["Free", "Masjid", "LimitedDays"]
    },
    // 49. Masjid Akbar
    {
        location_id: 131,
        venue_name: "Masjid Akbar",
        city: "Chennai",
        primary_area: "Kandanchavadi",
        address: "Near Kandanchavadi Bus Stop, Kandanchavadi, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        phones: ["9840135749"],
        features: ["Free", "Masjid"]
    },
    // 50. Masjid Al-Falah - Matches ID 36
    {
        location_id: 36,
        venue_name: "Masjid Al-Falah",
        city: "Chennai",
        primary_area: "Perungudi",
        address: "Close to Toll Plaza, Perungudi, Chennai – 600096",
        venue_type: "Masjid",
        food_type: "Free",
        latitude: 12.9644,
        longitude: 80.2447,
        features: ["Free", "Masjid"]
    },
    // 51. Masjid Allah - Matches ID 16 ("Masjid-e-Allah")
    {
        location_id: 16,
        venue_name: "Masjid Allah",
        city: "Chennai",
        primary_area: "Taramani",
        address: "Near TCS, Vijayan Nagar, 100ft Road, Taramani, Chennai – 600113",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00" },
        latitude: 12.9929,
        longitude: 80.2461,
        features: ["Free", "Masjid"]
    },
    // 52. Masjid Ar Rahman (Ekkatuthangal)
    {
        location_id: 132,
        venue_name: "Masjid Ar Rahman",
        city: "Chennai",
        primary_area: "Ekkatuthangal",
        address: "69, Poonamalle Rd, Gandhinagar, Ekkatuthangal, Chennai, Tamil Nadu 600032",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 53. Masjid e Hussainy (Royapeetah)
    {
        location_id: 133,
        venue_name: "Masjid e Hussainy",
        city: "Chennai",
        primary_area: "Royapeetah EB Office",
        address: "Mirza Ehsan Ali Khan Street, Royapeetah EB Office, Chennai",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        contact_persons: ["Ali Waris"],
        phones: ["8870065124"],
        features: ["Free", "Delivery"]
    },
    // 54. Masjid Husaneiya
    {
        location_id: 134,
        venue_name: "Masjid Husaneiya",
        city: "Chennai",
        primary_area: "Periyar Nagar",
        address: "Address missing",
        venue_type: "Masjid",
        food_type: "Free",
        phones: ["8637655612"],
        features: ["Free", "Masjid"]
    },
    // 55. Masjid Mubarak (Avadi) - Matches ID 56
    {
        location_id: 56,
        venue_name: "Masjid Mubarak",
        city: "Chennai",
        primary_area: "Avadi",
        address: "Vivekananda Nagar, TNHB MIG V Block, Avadi, Chennai – 600054",
        venue_type: "Masjid",
        food_type: "Free",
        latitude: 13.1000,
        longitude: 80.0000,
        features: ["Free", "Masjid"]
    },
    // 56. Masjid Noor (Tambaram West)
    {
        location_id: 135,
        venue_name: "Masjid Noor",
        city: "Chennai",
        primary_area: "Tambaram West",
        address: "Near Perungalathur-Poonamallee Bypass, Tambaram West, Chennai – 600045",
        venue_type: "Masjid",
        food_type: "Free",
        availability: "Entire Ramadan",
        features: ["Free", "Masjid"]
    },
    // 57. Masjid-E-Abubakar - Matches ID 29
    {
        location_id: 29,
        venue_name: "Masjid-E-Abubakar",
        city: "Chennai",
        primary_area: "Perambur",
        address: "Perambur Main Road, Perambur, Chennai – 600011",
        venue_type: "Masjid",
        food_type: "Free",
        latitude: 13.1160,
        longitude: 80.2317,
        features: ["Free", "Masjid"]
    },
    // 58. Masjid-E-Ahle Hadees - Matches ID 3
    {
        location_id: 3,
        venue_name: "Masjid-E-Ahle Hadees",
        city: "Chennai",
        primary_area: "Alandur",
        address: "Near Aone stationary shop, Alandur, Chennai – 600016",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00", end: "04:30" },
        availability: "Last 5 Odd Nights",
        features: ["Free", "Masjid", "LimitedDays"]
    },
    // 59. Masjid-E-Allah Jumma Masjid (Taramani) - Already covered by ID 16?
    // ID 16 is "Masjid-e-Allah". Address "Near TCS". This one "14, Mosque Street, Mahatma Gandhi Nagar".
    // 100ft road vs MG Nagar. Could be same or different. Let's add separate if unsure.
    {
        location_id: 136,
        venue_name: "Masjid-E-Allah Jumma Masjid",
        city: "Chennai",
        primary_area: "Taramani",
        address: "14, Mosque Street, Mahatma Gandhi Nagar, Taramani",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00" },
        features: ["Free", "Masjid"]
    },
    // 60. Masjid-e-Anwari (Sembakkam) - Matches ID 63? ID 63 is "Sothupakkam". No.
    // User text has "Masjid-e-Anwari" free and paid. Two entries.
    {
        location_id: 137,
        venue_name: "Masjid-e-Anwari (Sahar)",
        city: "Chennai",
        primary_area: "Tambaram / East Medavakkam",
        address: "Masjid-e-Anwari, Sembakkam, Chennai - 600073",
        venue_type: "Home Delivery",
        food_type: "Paid",
        phones: ["9884193210"],
        notes: "Pre-registration must | Full Ramadan Sahur package available",
        features: ["Paid", "Delivery"]
    },
    // 61. Masjid-E-Hameem
    {
        location_id: 138,
        venue_name: "Masjid-E-Hameem",
        city: "Chennai",
        primary_area: "Madipakkam",
        address: "Madipakkam Koot Road, near ICICI Bank and Ganesh Mahal, Madipakkam, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 62. Masjid-E-Jannath
    {
        location_id: 139,
        venue_name: "Masjid-E-Jannath",
        city: "Chennai",
        primary_area: "Aminjikarai",
        address: "Azad Nagar 1st Street, Aminjikarai, Chennai – 600029",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 63. Masjid-E-Noor (Nesappakkam)
    {
        location_id: 140,
        venue_name: "Masjid-E-Noor (Nesappakkam)",
        city: "Chennai",
        primary_area: "Nesappakkam",
        address: "NSC Bose Road, Khanu Nagar, Nesappakkam, Chennai – 600078",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 64. Masjid-E-Noor (Pallikaranai)
    {
        location_id: 141,
        venue_name: "Masjid-E-Noor (Pallikaranai)",
        city: "Chennai",
        primary_area: "Pallikaranai",
        address: "Mir Mumthaz Pasha, Pallikaranai, Chennai – 600100",
        venue_type: "Masjid",
        food_type: "Free",
        phones: ["9884229017"],
        features: ["Free", "Masjid"]
    },
    // 65. Masjid-e-Noor Kottivakkam - Matches ID 35
    {
        location_id: 35,
        venue_name: "Masjid-e-Noor (Kottivakkam)",
        city: "Chennai",
        primary_area: "Kottivakkam",
        address: "Kottivakkam Main Road, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        latitude: 12.9753,
        longitude: 80.2586,
        features: ["Free", "Masjid"]
    },
    // 66. Masjid-E-Nurul Islam - Matches ID 48
    {
        location_id: 48,
        venue_name: "Masjid-E-Nurul Islam",
        city: "Chennai",
        primary_area: "Madhavaram",
        address: "Near Madhavaram Roundtana, Madhavaram, Chennai – 600060",
        venue_type: "Masjid",
        food_type: "Free",
        latitude: 13.1160, // Presumed from old data for ID 29? No, need to be careful with inferred coords.
        // Actually ID 48 in old file has no coords.
        features: ["Free", "Masjid"]
    },
    // 67. Masjid-E-Rahmaniya (Medavakkam)
    {
        location_id: 142,
        venue_name: "Masjid-E-Rahmaniya (Medavakkam)",
        city: "Chennai",
        primary_area: "Medavakkam",
        address: "3/311, Ram Nagar 12th Main Rd, Medavakkam, Chennai – 600091",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 68. Masjid-E-Rahmaniya (Manali) - Matches ID 44
    {
        location_id: 44,
        venue_name: "Masjid-E-Rahmaniya (Manali)",
        city: "Chennai",
        primary_area: "Manali",
        address: "Near Manali New Town Bus Stop, Manali, Chennai – 600068",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 69. Masjid-e-Salam (Triplicane)
    {
        location_id: 143,
        venue_name: "Masjid-e-Salam",
        city: "Chennai",
        primary_area: "Triplicane",
        address: "Salam Street, Triplicane, Chennai – 600005",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        features: ["Free", "Masjid"]
    },
    // 70. Masjid-E-Siddique - Matches ID 47
    {
        location_id: 47,
        venue_name: "Masjid-E-Siddique",
        city: "Chennai",
        primary_area: "Tiruvottiyur",
        address: "Near Railway Station, Tiruvottiyur, Chennai – 600019",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 71. Masjid-E-Sofia - Matches ID 43
    {
        location_id: 43,
        venue_name: "Masjid-E-Sofia",
        city: "Chennai",
        primary_area: "Vyasarpadi",
        address: "Near MKB Nagar, Vyasarpadi, Chennai – 600039",
        venue_type: "Masjid",
        food_type: "Free",
        availability: "Last 10 Nights",
        features: ["Free", "Masjid", "LimitedDays"]
    },
    // 72. Masjid-e-Taqwa (Saidapet) - Matches ID 39 (Vadapalani) or New?
    // ID 39 is Vadapalani. This is Saidapet. Different.
    {
        location_id: 144,
        venue_name: "Masjid-e-Taqwa (Saidapet)",
        city: "Chennai",
        primary_area: "Saidapet",
        address: "Taqwa Street, Saidapet, Chennai – 600015",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        features: ["Free", "Masjid"]
    },
    // 73. Masjidun Noor ECR Sahar
    {
        location_id: 145,
        venue_name: "Masjidun Noor ECR Sahar",
        city: "Chennai",
        primary_area: "Pudupattinam",
        address: "Masjidun Noor Mosque, ECR, Hajiyar Nagar, Pudupattinam - 603102",
        venue_type: "Home Delivery",
        food_type: "Free",
        timing: { start: "03:00", end: "04:00" },
        phones: ["9894239866"],
        features: ["Free", "Delivery"]
    },
    // 74. Masjidur Rahman (Velachery)
    {
        location_id: 146,
        venue_name: "Masjidur Rahman",
        city: "Chennai",
        primary_area: "Velachery",
        address: "Velachery Main Road, Chennai – 600042",
        venue_type: "Masjid",
        food_type: "Free",
        availability: "Last 10 Days",
        features: ["Free", "Masjid", "LimitedDays"]
    },
    // 75. MMDA Masjid
    {
        location_id: 147,
        venue_name: "MMDA Masjid",
        city: "Chennai",
        primary_area: "Arumbakkam",
        address: "Near Post Office, Arumbakkam, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        features: ["Free", "Masjid"]
    },
    // 76. Mount Road / NCR / OMR - Perungudi
    {
        location_id: 148,
        venue_name: "Masjid Al Vilaya Sahar",
        city: "Chennai",
        primary_area: "Perungudi",
        address: "Perungudi Area, Chennai",
        venue_type: "Masjid",
        food_type: "Paid",
        phones: ["9655608700"],
        notes: "Subscription: ₹3,600 (30 Days) / ₹2,700 (22 Days)",
        features: ["Paid", "Masjid", "Subscription"]
    },
    // 77. Nawab Shadullah Khan Masjid
    {
        location_id: 149,
        venue_name: "Nawab Shadullah Khan Masjid",
        city: "Chennai",
        primary_area: "Saidapet",
        address: "Pookkara Theru (Canara Bank St), Saidapet, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "03:10" },
        features: ["Free", "Masjid"]
    },
    // 78. Nazeer BC
    {
        location_id: 150,
        venue_name: "Nazeer BC",
        city: "Chennai",
        primary_area: "Vepery",
        address: "Vepery, Chennai",
        venue_type: "Masjid",
        food_type: "Paid",
        phones: ["9994566620"],
        notes: "Paid – ₹120",
        features: ["Paid", "Masjid"]
    },
    // 79. Noor Masjid
    {
        location_id: 151,
        venue_name: "Noor Masjid",
        city: "Chennai",
        primary_area: "Urapakkam",
        address: "F2, Sulochana Villa, Poonga Street, Jagadeesh Nagar, Urapakkam – 603210",
        venue_type: "Masjid",
        food_type: "Free",
        phones: ["9976298356"],
        features: ["Free", "Masjid"]
    },
    // 80. Paramakudi Bismillah Hotel
    {
        location_id: 152,
        venue_name: "Paramakudi Bismillah Hotel",
        city: "Chennai",
        primary_area: "Pallavaram",
        address: "No.139, Mosque Street, K. Pallavaram, Chennai - 600043 (Opposite Aattuthotti)",
        venue_type: "Restaurant",
        food_type: "Free",
        notes: "Please collect token before Isha prayer.",
        phones: ["9884996686"],
        features: ["Free", "Restaurant", "TokenRequired"]
    },
    // 81. Quba Masjid (Old Pallavaram)
    {
        location_id: 153,
        venue_name: "Quba Masjid",
        city: "Chennai",
        primary_area: "Old Pallavaram",
        address: "5A Kovalan Street, Dargah Road, Old Pallavaram, Chennai",
        venue_type: "Masjid",
        food_type: "Paid",
        phones: ["8122987130"],
        features: ["Paid", "Masjid"]
    },
    // 82. Rahmaniya Masjid and Madrasa
    {
        location_id: 154,
        venue_name: "Rahmaniya Masjid and Madrasa",
        city: "Chennai",
        primary_area: "Old Pallavaram",
        address: "Kavitha Pannai, Old Pallavaram, Chennai - 117",
        venue_type: "Masjid",
        food_type: "Paid",
        contact_persons: ["Syed Abuthahir"],
        phones: ["9092541617"],
        features: ["Paid", "Masjid"]
    },
    // 83. Ramapuram Sahur Parcel
    {
        location_id: 155,
        venue_name: "Ramapuram Sahur Parcel",
        city: "Chennai",
        primary_area: "Ramapuram",
        address: "Venkateswara Nagar, 12th Street, Opposite Vinayagar Temple, Ramapuram, Chennai - 600089",
        venue_type: "Home Delivery",
        food_type: "Free",
        phones: ["9047217378"],
        features: ["Free", "Delivery"]
    },
    // 84. Sagar Hotel - Matches ID 21 (Hotel Sagar)
    {
        location_id: 21,
        venue_name: "Hotel Sagar",
        city: "Chennai",
        primary_area: "Triplicane",
        address: "116/239, Bharathi Salai, Padupakkam, Triplicane, Chennai – 600005",
        venue_type: "Hotel",
        food_type: "Paid",
        timing: { start: "03:00", end: "04:00" },
        latitude: 13.0640,
        longitude: 80.2806,
        features: ["Paid", "Hotel"]
    },
    // 85. Sahar Food Package
    {
        location_id: 156,
        venue_name: "Sahar Food Package",
        city: "Chennai",
        primary_area: "Unknown",
        address: "Area missing",
        venue_type: "Organization",
        food_type: "Paid",
        phones: ["9444978779"],
        notes: "₹2300 (30 Days)",
        features: ["Paid", "Subscription"]
    },
    // 86. Sahar Meal Arrangement - Thiru.V.K. Nagar
    {
        location_id: 157,
        venue_name: "Sahar Meal Arrangement",
        city: "Chennai",
        primary_area: "Thiru.V.K. Nagar",
        address: "Thiru.V.K. Nagar School, Perambur, Chennai",
        venue_type: "Home Delivery",
        food_type: "Paid",
        phones: ["9791094468"],
        notes: "One day meal: 50 rupees. Registration required.",
        features: ["Paid", "Delivery"]
    },
    // 87. Saleem Mess Triplicane
    {
        location_id: 158,
        venue_name: "Saleem Mess Triplicane",
        city: "Chennai",
        primary_area: "Triplicane",
        address: "2, OVM Street, Triplicane, Chennai – 600005",
        venue_type: "Restaurant",
        food_type: "Paid",
        timing: { start: "03:00", end: "04:00" },
        features: ["Paid", "Restaurant"]
    },
    // 88. Sholinganallur Monthly Sahar
    {
        location_id: 159,
        venue_name: "Sholinganallur Monthly Sahar",
        city: "Chennai",
        primary_area: "Sholinganallur",
        address: "Sholinganallur Area, Chennai",
        venue_type: "Masjid",
        food_type: "Paid",
        phones: ["9597458504"],
        notes: "₹2000 Monthly",
        features: ["Paid", "Masjid", "Subscription"]
    },
    // 89. Suhoor Food Initiative for Ladies
    {
        location_id: 160,
        venue_name: "Suhoor Food Initiative for Ladies",
        city: "Chennai",
        primary_area: "OMR (Perungudi to Siruseri)",
        address: "Delivery zones: Perungudi to Siruseri SIPCOT",
        venue_type: "Home Delivery",
        food_type: "Free",
        phones: ["9342391015"],
        notes: "Only for sisters staying in PG / alone.",
        features: ["Free", "Delivery", "WomenOnly"]
    },
    // 90. Umar Hussain
    {
        location_id: 161,
        venue_name: "Umar Hussain",
        city: "Chennai",
        primary_area: "Madras Medical College",
        address: "Madras Medical College Campus, Chennai",
        venue_type: "Organization",
        food_type: "Free",
        timing: { start: "03:30" },
        phones: ["9182919517"],
        notes: "Girls Only",
        features: ["Free", "WomenOnly"]
    },
    // 91. Yasmeen Mess Triplicane
    {
        location_id: 162,
        venue_name: "Yasmeen Mess Triplicane",
        city: "Chennai",
        primary_area: "Triplicane",
        address: "28, PN Dharga Main Street, Lawyers Road, Triplicane, Chennai – 600005",
        venue_type: "Restaurant",
        food_type: "Paid",
        timing: { start: "03:00", end: "04:00" },
        features: ["Paid", "Restaurant"]
    },
    // 92. Zaara – Masjid-e-Hameedia
    {
        location_id: 163,
        venue_name: "Zaara – Masjid-e-Hameedia",
        city: "Chennai",
        primary_area: "Ramapuram",
        address: "Ramapuram, Chennai",
        venue_type: "Masjid",
        food_type: "Free",
        timing: { start: "04:15" },
        features: ["Free", "Masjid", "Parcel"]
    },
    // 93. Zam Zam Restaurant (Arumbakkam) - Matches ID 38
    {
        location_id: 38,
        venue_name: "Zam Zam Restaurant",
        city: "Chennai",
        primary_area: "Arumbakkam",
        address: "Near CMBT Bus Stand, Arumbakkam, Chennai – 600106",
        venue_type: "Restaurant",
        food_type: "Paid",
        latitude: 13.0640,
        longitude: 80.2199,
        features: ["Paid", "Restaurant"]
    }
];
