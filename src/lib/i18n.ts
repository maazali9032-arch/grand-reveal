import type { Lang } from "./invitation-types";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "te", label: "తెలుగు" },
];

type Dict = {
  openInvitation: string;
  scrollGently: string;
  weAreGettingMarried: string;
  countdownTitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  celebrationBegun: string;
  scheduleTitle: string;
  scheduleOverline: string;
  dayLabel: string;
  venueTitle: string;
  venueOverline: string;
  getDirections: string;
  rsvpTitle: string;
  rsvpOverline: string;
  rsvpAccept: string;
  rsvpDecline: string;
  rsvpThanks: string;
  rsvpSorry: string;
  contactTitle: string;
  contactOverline: string;
  call: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  youtube: string;
  finalLine: string;
  finalNote: string;
  playMusic: string;
  pauseMusic: string;
  language: string;
  withLoveFrom: string;
  galleryTitle: string;
  galleryOverline: string;
  coupleTitle: string;
  coupleOverline: string;
  loading: string;
  errorTitle: string;
  errorNote: string;
  retry: string;
  notFoundTitle: string;
  notFoundNote: string;
  unavailableTitle: string;
  unavailableNote: string;
};

export const STRINGS: Record<Lang, Dict> = {
  en: {
    openInvitation: "Scroll to open",
    scrollGently: "Please scroll gently",
    weAreGettingMarried: "Together with our families",
    countdownTitle: "Counting the moments",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    celebrationBegun: "The celebration has begun",
    scheduleTitle: "Order of Celebrations",
    scheduleOverline: "The days ahead",
    dayLabel: "Day",
    venueTitle: "The Setting",
    venueOverline: "Where we gather",
    getDirections: "Get Directions",
    rsvpTitle: "Your Presence",
    rsvpOverline: "Kindly respond",
    rsvpAccept: "Will Be There",
    rsvpDecline: "Regretfully Decline",
    rsvpThanks: "Your blessing is received. We shall await you.",
    rsvpSorry: "You will be dearly missed. Thank you for letting us know.",
    contactTitle: "With Warm Regards",
    contactOverline: "Reach the family",
    call: "Call",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    youtube: "YouTube",
    finalLine: "And so, a new chapter begins",
    finalNote: "We would be honoured by your presence",
    playMusic: "Play music",
    pauseMusic: "Pause music",
    language: "Language",
    withLoveFrom: "Crafted by",
    galleryTitle: "Moments",
    galleryOverline: "A glimpse",
    coupleTitle: "The Couple",
    coupleOverline: "With our families",
    loading: "Opening your invitation",
    errorTitle: "Something interrupted us",
    errorNote: "The invitation could not be loaded just now. Please try again in a moment.",
    retry: "Try Again",
    notFoundTitle: "Invitation not found",
    notFoundNote: "This link does not match any invitation. Please check the address shared with you.",
    unavailableTitle: "This invitation is unavailable",
    unavailableNote: "This invitation is no longer open. For any assistance, please reach out below.",
  },
  hi: {
    openInvitation: "खोलने के लिए स्क्रॉल करें",
    scrollGently: "कृपया धीरे स्क्रॉल करें",
    weAreGettingMarried: "अपने परिवारजनों के साथ",
    countdownTitle: "क्षणों की गिनती",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    celebrationBegun: "उत्सव आरंभ हो चुका है",
    scheduleTitle: "समारोह की रूपरेखा",
    scheduleOverline: "आगामी दिन",
    dayLabel: "दिन",
    venueTitle: "स्थल",
    venueOverline: "जहाँ हम एकत्र होंगे",
    getDirections: "रास्ता देखें",
    rsvpTitle: "आपकी उपस्थिति",
    rsvpOverline: "कृपया उत्तर दें",
    rsvpAccept: "अवश्य आऊँगा/आऊँगी",
    rsvpDecline: "क्षमा सहित असमर्थ",
    rsvpThanks: "आपका आशीर्वाद प्राप्त हुआ। हम प्रतीक्षा करेंगे।",
    rsvpSorry: "आपकी कमी खलेगी। सूचित करने के लिए धन्यवाद।",
    contactTitle: "सादर स्नेह",
    contactOverline: "परिवार से संपर्क",
    call: "कॉल",
    whatsapp: "व्हाट्सएप",
    instagram: "इंस्टाग्राम",
    facebook: "फेसबुक",
    youtube: "यूट्यूब",
    finalLine: "और इस प्रकार एक नया अध्याय आरंभ होता है",
    finalNote: "आपकी उपस्थिति हमारा सौभाग्य होगी",
    playMusic: "संगीत चलाएँ",
    pauseMusic: "संगीत रोकें",
    language: "भाषा",
    withLoveFrom: "निर्मित",
    galleryTitle: "क्षण",
    galleryOverline: "एक झलक",
    coupleTitle: "वर एवं वधू",
    coupleOverline: "परिवारजनों सहित",
    loading: "आपका आमंत्रण खुल रहा है",
    errorTitle: "कुछ बाधा आ गई",
    errorNote: "आमंत्रण इस समय लोड नहीं हो सका। कृपया कुछ क्षण बाद पुनः प्रयास करें।",
    retry: "पुनः प्रयास करें",
    notFoundTitle: "आमंत्रण नहीं मिला",
    notFoundNote: "यह लिंक किसी आमंत्रण से मेल नहीं खाता। कृपया साझा किया गया पता जाँचें।",
    unavailableTitle: "यह आमंत्रण उपलब्ध नहीं है",
    unavailableNote: "यह आमंत्रण अब खुला नहीं है। सहायता हेतु नीचे संपर्क करें।",
  },
  te: {
    openInvitation: "తెరవడానికి స్క్రోల్ చేయండి",
    scrollGently: "దయచేసి మెల్లగా స్క్రోల్ చేయండి",
    weAreGettingMarried: "మా కుటుంబ సభ్యులతో కలిసి",
    countdownTitle: "క్షణాల లెక్కింపు",
    days: "రోజులు",
    hours: "గంటలు",
    minutes: "నిమిషాలు",
    seconds: "సెకన్లు",
    celebrationBegun: "వేడుక ప్రారంభమైంది",
    scheduleTitle: "వేడుకల క్రమం",
    scheduleOverline: "రాబోయే రోజులు",
    dayLabel: "రోజు",
    venueTitle: "వేదిక",
    venueOverline: "మనం కలిసే చోటు",
    getDirections: "దారి చూడండి",
    rsvpTitle: "మీ రాక",
    rsvpOverline: "దయచేసి తెలియజేయండి",
    rsvpAccept: "తప్పకుండా వస్తాను",
    rsvpDecline: "క్షమించండి, రాలేను",
    rsvpThanks: "మీ ఆశీస్సులు అందాయి. మీ రాక కోసం ఎదురుచూస్తాము.",
    rsvpSorry: "మీ లేమి తెలుస్తుంది. తెలియజేసినందుకు ధన్యవాదాలు.",
    contactTitle: "ప్రేమతో",
    contactOverline: "కుటుంబాన్ని సంప్రదించండి",
    call: "కాల్",
    whatsapp: "వాట్సాప్",
    instagram: "ఇన్‌స్టాగ్రామ్",
    facebook: "ఫేస్‌బుక్",
    youtube: "యూట్యూబ్",
    finalLine: "ఇలా ఒక కొత్త అధ్యాయం మొదలవుతుంది",
    finalNote: "మీ రాక మాకు గౌరవం",
    playMusic: "సంగీతం ప్రారంభించండి",
    pauseMusic: "సంగీతం ఆపండి",
    language: "భాష",
    withLoveFrom: "రూపకల్పన",
    galleryTitle: "క్షణాలు",
    galleryOverline: "ఒక దృశ్యం",
    coupleTitle: "వధూవరులు",
    coupleOverline: "కుటుంబ సభ్యులతో",
    loading: "మీ ఆహ్వానం తెరుచుకుంటోంది",
    errorTitle: "ఏదో అంతరాయం",
    errorNote: "ఆహ్వానం ఇప్పుడే లోడ్ కాలేదు. కొద్దిసేపటి తర్వాత ప్రయత్నించండి.",
    retry: "మళ్లీ ప్రయత్నించండి",
    notFoundTitle: "ఆహ్వానం కనబడలేదు",
    notFoundNote: "ఈ లింక్ ఏ ఆహ్వానానికీ సరిపోలదు. మీకు ఇచ్చిన చిరునామాను సరిచూడండి.",
    unavailableTitle: "ఈ ఆహ్వానం అందుబాటులో లేదు",
    unavailableNote: "ఈ ఆహ్వానం ఇప్పుడు తెరవబడలేదు. సహాయం కోసం కింద సంప్రదించండి.",
  },
};

export function useStrings(lang: Lang): Dict {
  return STRINGS[lang] ?? STRINGS.en;
}

const DAY_NAMES: Record<Lang, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
  te: ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"],
};

const MONTH_NAMES: Record<Lang, string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  hi: [
    "जनवरी",
    "फरवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
  ],
  te: [
    "జనవరి",
    "ఫిబ్రవరి",
    "మార్చి",
    "ఏప్రిల్",
    "మే",
    "జూన్",
    "జూలై",
    "ఆగస్టు",
    "సెప్టెంబర్",
    "అక్టోబర్",
    "నవంబర్",
    "డిసెంబర్",
  ],
};

/** Deterministic (SSR-safe) date formatting — no Intl locale data needed. */
export function formatDateLine(iso: string, lang: Lang) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return { day: "", date: iso };
  return {
    day: DAY_NAMES[lang][d.getDay()],
    date: `${d.getDate()} ${MONTH_NAMES[lang][d.getMonth()]} ${d.getFullYear()}`,
  };
}
