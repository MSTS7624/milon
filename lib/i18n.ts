// Multi-language support
export const translations = {
  en: {
    // Navigation
    "nav.browse": "Browse Jobs",
    "nav.applications": "My Applications",
    "nav.saved": "Saved Jobs",
    "nav.dashboard": "Dashboard",
    "nav.postJob": "Post New Job",
    "nav.manageJobs": "Manage Jobs",
    "nav.applications_pub": "Applications",

    // Home Page
    "home.title": "Find Your Perfect Job Opportunity",
    "home.subtitle":
      "Connect with top companies and discover career opportunities that match your skills and aspirations",
    "home.jobSeeker": "Job Seeker",
    "home.jobSeekerDesc": "Find and apply for jobs",
    "home.employer": "Employer",
    "home.employerDesc": "Post jobs and hire talent",
    "home.createAccount": "Create Account",
    "home.signIn": "Sign In",

    // Job Listing
    "jobs.search": "Search by job title, company, or location...",
    "jobs.findDream": "Find Your Dream Job",
    "jobs.applyNow": "Apply Now",
    "jobs.saveJob": "Save Job",
    "jobs.noResults": "No jobs found matching your search.",

    // Application
    "app.uploadCV": "Upload CV",
    "app.coverLetter": "Cover Letter (Optional)",
    "app.submit": "Submit Application",
    "app.cancel": "Cancel",
    "app.whatsapp": "Send WhatsApp Message",
    "app.dragDrop": "Drag and drop your CV here or click to browse",
    "app.supportedFormats": "Supported formats: PDF, DOC, DOCX",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.activeJobs": "Active Jobs",
    "dashboard.totalApplications": "Total Applications",
    "dashboard.totalViews": "Total Views",
    "dashboard.yourPostings": "Your Job Postings",
    "dashboard.manageTrack": "Manage and track your active job listings",
  },
  bn: {
    // Navigation
    "nav.browse": "চাকরি খুঁজুন",
    "nav.applications": "আমার আবেদন",
    "nav.saved": "সংরক্ষিত চাকরি",
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.postJob": "নতুন চাকরি পোস্ট করুন",
    "nav.manageJobs": "চাকরি পরিচালনা করুন",
    "nav.applications_pub": "আবেদন",

    // Home Page
    "home.title": "আপনার স্বপ্নের চাকরি খুঁজে পান",
    "home.subtitle": "শীর্ষ কোম্পানিগুলির সাথে সংযোগ করুন এবং আপনার দক্ষতা এবং আকাঙ্ক্ষার সাথে মেলে এমন ক্যারিয়ারের সুযোগ আবিষ্কার করুন",
    "home.jobSeeker": "চাকরি খোঁজক",
    "home.jobSeekerDesc": "চাকরি খুঁজুন এবং আবেদন করুন",
    "home.employer": "নিয়োগকর্তা",
    "home.employerDesc": "চাকরি পোস্ট করুন এবং প্রতিভা নিয়োগ করুন",
    "home.createAccount": "অ্যাকাউন্ট তৈরি করুন",
    "home.signIn": "সাইন ইন করুন",

    // Job Listing
    "jobs.search": "চাকরির শিরোনাম, কোম্পানি বা অবস্থান দ্বারা অনুসন্ধান করুন...",
    "jobs.findDream": "আপনার স্বপ্নের চাকরি খুঁজে পান",
    "jobs.applyNow": "এখনই আবেদন করুন",
    "jobs.saveJob": "চাকরি সংরক্ষণ করুন",
    "jobs.noResults": "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো চাকরি পাওয়া যায়নি।",

    // Application
    "app.uploadCV": "সিভি আপলোড করুন",
    "app.coverLetter": "কভার লেটার (ঐচ্ছিক)",
    "app.submit": "আবেদন জমা দিন",
    "app.cancel": "বাতিল করুন",
    "app.whatsapp": "হোয়াটসঅ্যাপ বার্তা পাঠান",
    "app.dragDrop": "আপনার সিভি এখানে টেনে আনুন বা ব্রাউজ করতে ক্লিক করুন",
    "app.supportedFormats": "সমর্থিত ফর্ম্যাট: PDF, DOC, DOCX",

    // Dashboard
    "dashboard.welcome": "স্বাগতম",
    "dashboard.activeJobs": "সক্রিয় চাকরি",
    "dashboard.totalApplications": "মোট আবেদন",
    "dashboard.totalViews": "মোট ভিউ",
    "dashboard.yourPostings": "আপনার চাকরির পোস্টিং",
    "dashboard.manageTrack": "আপনার সক্রিয় চাকরির তালিকা পরিচালনা এবং ট্র্যাক করুন",
  },
}

export type Language = "en" | "bn"

export function t(key: string, lang: Language = "en"): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
