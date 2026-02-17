
export type Language = 'en' | 'ta' | 'ur';

export type TranslationKey =
    // Header
    | 'appTitle'
    | 'shareApp'

    // Hero
    | 'ramadanKareem'
    | 'findSehri'
    | 'distributionPoints'
    | 'disclaimer'
    | 'searchPlaceholder'
    | 'nearMe'
    | 'submitSpot'
    | 'listView'
    | 'mapView'

    // Filters
    | 'spotsFound'
    | 'filter'
    | 'masjid'
    | 'restaurant'
    | 'home'
    | 'association'
    | 'free'
    | 'paid'
    | 'partiallyPaid'
    | 'verified'
    | 'unverified'
    | 'ladiesSection'
    | 'mensSection'
    | 'allAreas'
    | 'allCities'
    | 'selectCity'
    | 'selectArea'

    // Listing Card
    | 'directions'
    | 'share'
    | 'copyLink'
    | 'copied'
    | 'openMap'
    | 'viewDetails'
    | 'reportIssue'
    | 'cancel'
    | 'confirm'
    | 'save'
    | 'saved'

    // Contact Modal
    | 'contactModalTitle'
    | 'chatWhatsApp'
    | 'callNow'

    // Footer
    | 'volunteer'
    | 'contact'
    | 'copyright';


export const translations: Record<Language, Record<string, string>> = {
    en: {
        appTitle: 'Sehri Finder',
        shareApp: 'Share App',

        ramadanKareem: 'Ramadan Kareem',
        findSehri: 'Find Your Sehri',
        distributionPoints: 'Distribution Point',
        disclaimer: 'Community Data Disclaimer: This list is compiled from community sources. Please confirm availability and timing before visiting.',
        searchPlaceholder: 'Search by area, place name, or features...',
        nearMe: 'Near Me',
        submitSpot: 'Submit a Community Spot',
        listView: 'List',
        mapView: 'Map',

        spotsFound: 'spots found',
        filter: 'Filter',
        masjid: 'Masjid',
        restaurant: 'Restaurant',
        home: 'Home',
        association: 'Association',
        free: 'Free',
        paid: 'Paid',
        partiallyPaid: 'Low Cost',
        verified: 'Verified',
        unverified: 'Unverified',
        ladiesSection: 'Ladies Section',
        mensSection: 'Mens Section',
        allAreas: 'All Areas',
        allCities: 'All Cities',
        selectCity: 'Select City',
        selectArea: 'Select Area',

        directions: 'Directions',
        share: 'Share',
        copyLink: 'Copy Link',
        copied: 'Copied!',
        openMap: 'Open Map',
        viewDetails: 'View Details',
        reportIssue: 'Report Info',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        saved: 'Saved',

        // Contact Modal
        contactModalTitle: 'Contact Choices',
        chatWhatsApp: 'Chat on WhatsApp',
        callNow: 'Call Now',

        volunteer: 'Volunteer',
        contact: 'Contact',
        copyright: 'Sehri Finder 2026. Built for the community.'
    },
    ta: {
        appTitle: 'செஹ்ரி பைண்டர்',
        shareApp: 'பகிரவும்',

        ramadanKareem: 'ரமலான் முபாரக்',
        findSehri: 'உங்கள் செஹ்ரி',
        distributionPoints: 'விநியோக இடத்தை கண்டறியவும்',
        disclaimer: 'சமூக தரவு மறுப்பு: இந்த பட்டியல் சமூக ஆதாரங்களில் இருந்து தொகுக்கப்பட்டது. செல்வதற்கு முன் நேரத்தை உறுதிப்படுத்தவும்.',
        searchPlaceholder: 'பகுதி, பெயர் அல்லது வசதிகளைத் தேடுங்கள்...',
        nearMe: 'அருகில்',
        submitSpot: 'புதிய இடத்தை சேர்க்கவும்',
        listView: 'பட்டியல்',
        mapView: 'வரைபடம்',

        spotsFound: 'இடங்கள் கிடைத்தன',
        filter: 'வடிகட்டி',
        masjid: 'மஸ்ஜித்',
        restaurant: 'உணவகம்',
        home: 'வீடு',
        association: 'சங்கம்',
        free: 'இலவசம்',
        paid: 'கட்டணம்',
        partiallyPaid: 'குறைந்த விலை',
        verified: 'சரிபார்க்கப்பட்டது',
        unverified: 'சரிபார்க்கப்படவில்லை',
        ladiesSection: 'பெண்கள் பகுதி',
        mensSection: 'ஆண்கள் பகுதி',
        allAreas: 'அனைத்து பகுதிகளும்',
        allCities: 'அனைத்து நகரங்களும்',
        selectCity: 'நகரத்தைத் தேர்ந்தெடுக்கவும்',
        selectArea: 'பகுதியைத் தேர்ந்தெடுக்கவும்',

        directions: 'வழி',
        share: 'பகிர்',
        copyLink: 'இணைப்பை நகலெடு',
        copied: 'நகலெடுக்கப்பட்டது!',
        openMap: 'வரைபடம்',
        viewDetails: 'விவரங்கள்',
        reportIssue: 'புகாரளி',
        cancel: 'ரத்து',
        confirm: 'உறுதிசெய்க',
        save: 'சேமி',
        saved: 'சேமிக்கப்பட்டது',

        // Contact Modal
        contactModalTitle: 'தொடர்பு விருப்பங்கள்',
        chatWhatsApp: 'வாட்ஸ்அப்பில் சேட் செய்யவும்',
        callNow: 'அழைக்கவும்',

        volunteer: 'தன்னார்வலர்',
        contact: 'தொடர்பு',
        copyright: 'செஹ்ரி பைண்டர் 2026. சமூகத்திற்காக உருவாக்கப்பட்டது.'
    },
    ur: {
        appTitle: 'سحری فائنڈر',
        shareApp: 'ایپ شیئر کریں',

        ramadanKareem: 'رمضان کریم',
        findSehri: 'اپنی سحری تلاش کریں',
        distributionPoints: 'تقسیم کے مقامات',
        disclaimer: 'یہ فہرست عوامی ذرائع سے مرتب کی گئی ہے۔ براہ کرم جانے سے پہلے وقت اور دستیابی کی تصدیق کریں۔',
        searchPlaceholder: 'علاقہ، نام یا سہولیات تلاش کریں...',
        nearMe: 'میرے قریب',
        submitSpot: 'نیا مقام شامل کریں',
        listView: 'فہرست',
        mapView: 'نقشہ',

        spotsFound: 'مقامات ملے',
        filter: 'فلٹر',
        masjid: 'مسجد',
        restaurant: 'ریستوراں',
        home: 'گھر',
        association: 'ایسوسی ایشن',
        free: 'مفت',
        paid: 'قیمت',
        partiallyPaid: 'کم قیمت',
        verified: 'تصدیق شدہ',
        unverified: 'غیر تصدیق شدہ',
        ladiesSection: 'خواتین کا حصہ',
        mensSection: 'مردوں کا حصہ',
        allAreas: 'تمام علاقے',
        allCities: 'تمام شہر',
        selectCity: 'شہر منتخب کریں',
        selectArea: 'علاقہ منتخب کریں',

        directions: 'راستہ',
        share: 'شیئر',
        copyLink: 'لنک کاپی کریں',
        copied: 'کاپی ہو گیا!',
        openMap: 'نقشہ کھولیں',
        viewDetails: 'تفصیلات',
        reportIssue: 'رپورٹ',
        cancel: 'منسوخ',
        confirm: 'تصدیق',
        save: 'محفوظ کریں',
        saved: 'محفوظ',

        // Contact Modal
        contactModalTitle: 'رابطہ کے طریقے',
        chatWhatsApp: 'واٹس ایپ پر بات کریں',
        callNow: 'اب کال کریں',

        volunteer: 'رضاکار',
        contact: 'رابطہ',
        copyright: 'سحری فائنڈر 2026. کمیونٹی کے لیے بنایا گیا۔'
    }
};
