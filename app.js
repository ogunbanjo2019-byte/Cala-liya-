const EMAIL = "reservations@calalaiyabeach-resort.com";
const PHONE = "+63 09512472881";
const LOGO = "https://calalaiya.com/wp-content/themes/html5blank-stable/templatehtml/img/logo.png";
const WA_URL = "https://wa.me/6309512472881";
const IMG = (name) => `https://calalaiya.com/wp-content/uploads/${name}`;
const CLOUD = (version, name) =>
  `https://res.cloudinary.com/dcjjpngas/image/upload/v${version}/calalaiya-resort/rooms/${name}.jpg`;
let imageMap = {};
let activeHero = 0;
let activeReview = 0;
let chosenDates = { checkIn: null, checkOut: null };
let chosenMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedRoom = null;
let selectedGuests = 1;
let bookingStage = "dates";
let lightboxItems = [];
let lightboxIndex = 0;

const rooms = [
  {
    name: "Garden Casita",
    slug: "garden-casita",
    id: "demo-garden-casita",
    category: "GARDEN CASITAS",
    price: 5000,
    beds: "1 Queen Bed",
    capacity: 2,
    image: CLOUD("1779508896", "garden-casita-1"),
    photos: [CLOUD("1779508896", "garden-casita-1"), CLOUD("1779508899", "garden-casita-2")],
  },
  {
    name: "Garden Casita Premier",
    slug: "garden-casita-premier",
    id: "demo-garden-casita-premier",
    category: "GARDEN CASITAS",
    price: 8000,
    beds: "2 Queen Beds",
    capacity: 4,
    image: CLOUD("1779508907", "gcp-1"),
    photos: [CLOUD("1779508907", "gcp-1"), CLOUD("1779508910", "gcp-2"), CLOUD("1779508911", "gcp-3")],
  },
  {
    name: "Two-Bedroom Casita",
    slug: "two-bedroom-casita",
    id: "demo-two-bedroom-casita",
    category: "AQUATICO VILLAS",
    price: 10000,
    beds: "2 Queen Beds and 2 Single Beds",
    capacity: 6,
    image: CLOUD("1779508924", "2bc-3"),
    photos: [CLOUD("1779508924", "2bc-3")],
  },
  {
    name: "Three-Bedroom Casita",
    slug: "three-bedroom-casita",
    id: "demo-three-bedroom-casita",
    category: "AQUATICO VILLAS",
    price: 13000,
    beds: "1 King Bed, 2 Queen Beds, and 1 Single Bed",
    capacity: 8,
    image: CLOUD("1779508930", "3bc-3"),
    photos: [CLOUD("1779508930", "3bc-3"), CLOUD("1779508931", "3bc-4"), CLOUD("1779508933", "3bc-5")],
  },
  {
    name: "Three-Bedroom Premier",
    slug: "three-bedroom-premiere",
    id: "demo-three-bedroom-premier",
    category: "AQUATICO VILLAS",
    price: 15500,
    beds: "1 King Bed and 2 Queen Beds",
    capacity: 9,
    image: CLOUD("1779508944", "3bp-1"),
    photos: [CLOUD("1779508944", "3bp-1"), CLOUD("1779508952", "3bp-2"), CLOUD("1779508958", "3bp-3")],
  },
  {
    name: "Three-Bedroom Luxury Pool Villa",
    slug: "luxury-pool-villa-3br",
    id: "demo-luxury-pool-villa-3br",
    category: "PRIVATE LUXURY POOL VILLAS",
    price: 19500,
    beds: "6 Queen Beds",
    capacity: 12,
    image: CLOUD("1780204883", "dug04jgw5banmj4zqiua"),
    photos: [CLOUD("1780204883", "dug04jgw5banmj4zqiua"), CLOUD("1780204883", "tbxl8ze1sprbkjidpbmg"), CLOUD("1780204884", "odn4jusny11znu8u2fch")],
  },
  {
    name: "Four-Bedroom Luxury Pool Villa",
    slug: "four-bedroom-luxury-pool-villa",
    id: "demo-luxury-pool-villa-4br",
    category: "PRIVATE LUXURY POOL VILLAS",
    price: 23000,
    beds: "1 King Bed and 6 Queen Beds",
    capacity: 15,
    image: CLOUD("1779607672", "ll58wwbcxisqgponwizh"),
    photos: [CLOUD("1779607672", "ll58wwbcxisqgponwizh")],
  },
  {
    name: "Five-Bedroom Luxury Pool Villa",
    slug: "luxury-pool-villa-5br",
    id: "demo-luxury-pool-villa-5br",
    category: "PRIVATE LUXURY POOL VILLAS",
    price: 34500,
    beds: "2 King Beds and 8 Queen Beds",
    capacity: 20,
    image: CLOUD("1779608000", "lnymzsdxgewcvpvndhdb"),
    photos: [CLOUD("1779608000", "lnymzsdxgewcvpvndhdb"), CLOUD("1779608001", "b9dr2ougxjnntlvaaott"), CLOUD("1779608001", "bnsmcndvtbxwpmzv0qup")],
  },
];
const roomCategories = ["GARDEN CASITAS", "AQUATICO VILLAS", "PRIVATE LUXURY POOL VILLAS"];
const inclusions = ["Daily buffet breakfast, lunch, and dinner"];
const additionalGuestRates = [
  "Adults: ₱1,500 per person",
  "Children (7–12 years old): ₱1,000 per person",
  "Children (6 years old and below): Complimentary",
];
const heroSlides = [
  {
    title: "3D AND LAGOON POOL",
    image: IMG("2024/03/IMG_20231007_104739.jpg"),
    alt: "3D and Lagoon Pool",
  },
  {
    title: "THREE BEDROOM",
    image: IMG("2024/03/IMG_20231007_071314-scaled.jpg"),
    alt: "Three Bedroom",
  },
  {
    title: "BALSA RAFT",
    image: IMG("2024/03/Untitled-design-2-6.png"),
    alt: "Balsa Raft",
  },
  { title: "DAYBEDS", image: IMG("2024/03/asd-1-scaled.jpg"), alt: "Daybeds" },
];
const activities = [
  {
    name: "Day Beds",
    hours: "7AM - 10PM",
    image: IMG("2021/08/daybeds_07_640x400.jpg"),
    description:
      "Enjoy our incredibly versatile daybeds that function as a bed, lounge, and even dining space. Our daybeds are strategically situated fronting the beach where one can get both sun for some Vitamin D boosting, and shade when it gets sweltering hot. Our daybeds are encompassed by the soothing view of Tayabas Bay, and the stunning site of our pool and Pavilion. Whether you snooze, lounge, or dine, our daybeds are there for you to unplug and recharge.",
  },
  {
    name: "Kids Activities",
    hours: "8AM - 4PM",
    image: IMG("2021/08/kids-activities-04-min.jpg"),
    description:
      "Whether you are a family of 3 or 10 members, we have a selection of fun-filled activities and ideas not just for children but the whole family too. Day or night, indoors or outdoors, a brief weekday getaway or a much needed weekend family get together, we have fun activities lined up for your family.",
  },
  {
    name: "Paddle Board",
    hours: "8AM - 5PM",
    image: IMG("2021/07/main-paddleboat.jpg"),
    description:
      "Experience the thrill of paddle boarding on the calm, tranquil seas of Tayabas Bay.",
  },
  {
    name: "Kayaking",
    hours: "8AM - 5PM",
    image: IMG("2021/07/main-kayaking.jpg"),
    description: "Hop on a kayak to explore the peaceful cove at your own pace.",
  },
  {
    name: "Balsa Raft",
    hours: "8AM - 5PM",
    image: IMG("2024/03/Untitled-design-2-6.png"),
    description:
      "Experience some serenity while having fun in the water and under the sun from our balsa raft.",
    extra:
      "Minimum of two (2) and maximum of eight (8) pax, adults and children, per use (not including the 2 boatmen). Children must be with adult supervision at all times. P 854 per hour",
  },
  {
    name: "Boat Tours",
    hours: "8AM - 5PM",
    image: IMG("2021/07/boattours-1.jpg"),
    description:
      "Discover the waters around the southern tip of Batangas aboard an outrigger boat, be amazed by the marine life at the sanctuary, and delight in fish feeding. You can also watch the sunset behind Mount Dagulgol.",
    extra:
      "Speed Boat – One hour ride minimum of P 2,562 for 6 pax and below. Food is not allowed. Only bottled water is allowed on board. All motorized water activities require signed waivers by each rider or passenger.",
  },
  {
    name: "Massage Services",
    hours: "8AM - 9PM",
    image: IMG("2022/05/117A9994-1-scaled.jpg"),
    description: "Massage service available from 8AM – 9PM",
    extra:
      "Php 1,586 per hour; Php 793 for an additional 30 minutes. Swedish massage only. Available for room service or beachfront service. Request with the Front Office at least 2 hours in advance; last time to request is 7pm. Last minute cancellation shall be charged Php 900 nett.",
  },
  {
    name: "Cala Trail",
    hours: "8AM - 5PM",
    image: IMG("2022/07/IMG_7392-scaled.jpg"),
    description: "Take the scenic route and be a fitter you with our Cala Trail.",
  },
  {
    name: "Archery Range",
    hours: "8AM - 5PM",
    image: IMG("2022/11/IMG_0485.jpg"),
    description:
      "Archery Range is from 8AM – 5PM. Complimentary Activity. For 9 years old and above. Book lessons at the Front Office at least one hour in advance (latest to book is 3PM) and sign a waiver. Archery range located inside the Cala Trail.",
  },
];
const gallery = [
  ["117A2832-min.jpg", "Restaurant"],
  ["DSC_0007-min-scaled.jpg", "Beach"],
  ["DSC_0967-min-scaled.jpg", "Resort"],
  ["garden-casitas-02-min.jpg", "Garden Casitas"],
  ["garden-casitas-03-min.jpg", "Garden Casitas"],
  ["IMG_0759-min-scaled.jpg", "Cala Laiya"],
  ["DSC_0848-min-scaled.jpg", "Resort"],
  ["two-bedroom-02-min.jpg", "Two Bedroom Casita"],
  ["DSC_0583-min-scaled.jpg", "Resort"],
  ["two-bedroom-03-min.jpg", "Two Bedroom Casita"],
  ["DSC_0884-min.jpg", "Resort"],
  ["IMG_0696-min-scaled.jpg", "Resort"],
  ["Espresso-min.jpg", "Espresso"],
  ["MG_3079-min-scaled.jpg", "Resort"],
  ["MG_3110-min.jpg", "Resort"],
  ["DSC_0094-min.jpg", "Resort"],
  ["DSC_0109-min.jpg", "Resort"],
  ["DSC_0195-min-scaled.jpg", "Resort"],
  ["DSC_0141-min.jpg", "Resort"],
].map(([file, alt]) => ({ image: IMG(`2021/07/${file}`), alt }));
const reviews = [
  {
    title: "Best Stay in the Philippines",
    author: "TEP",
    date: "February 2024",
    text: "Best time with my family. Beautiful resort, very serene, & amazing service. We stayed in a 3 bedroom Casita and we were welcomed with this delicious tamarind juice. The room was clean, spacious and had an amazing beachfront views. The beds were so nicely done with beautiful welcome amenities. The swimming pools were very clean and new. The food was delicious especially their Filipino food and breakfast. We also tried their seafood boodle fight and it was very good! There were so many water activities to enjoy and we tried their Balsa Raft and speed boat which was so fun.",
  },
  {
    title: "An unforgettable lovely experience",
    author: "Cynthia D",
    date: "January 2024",
    text: "It was my mother’s (a senior) first visit to Cala, we were informed of the ongoing renovation but this does not affect my mother’s stay. She enjoyed the peace and quiet ambiance. The complimentary balsa raft is the best, by the look on her face how she was excited was priceless. Love the food and the 4 cheese pizza and lomi, she even asked for a second order. All staff were courteous and friendly.",
  },
  {
    title: "Highly-recommended, Pet-Friendly Place",
    author: "Pinky L",
    date: "October 2023",
    text: "Highly recommended place not just for business but also for personal travel. The whole property is very big where you can have outdoor activities like running, archery, and just chill around in front of the beach and under the trees. One of the highlights for me is it being pet friendly. My dog was so happy running in the grass and sand. They have two big swimming pools and a restaurant that offers delicious Asian dishes.",
  },
];
const nav = [
  ["HOME", "/"],
  ["ABOUT", "/about"],
  ["ROOMS", "/rooms"],
  ["ACTIVITIES", "/activities"],
  ["GALLERY", "/gallery"],
  ["CONTACT", "/contact"],
];
const asset = (url) => imageMap[url] || url;
const money = (n) => `₱${Number(n).toLocaleString("en-PH")}`;
const esc = (s = "") =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const img = (url, alt, cls = "") =>
  `<img class="${cls}" src="${esc(asset(url))}" alt="${esc(alt)}" loading="lazy">`;
const link = (href, label, cls = "text-link", attrs = "") =>
  `<a class="${cls}" href="${href}" ${attrs}>${label}</a>`;

function header() {
  const current = location.pathname.replace(/\/$/, "") || "/";
  return `<header class="site-header"><a class="brand" href="/" aria-label="Cala Laiya home"><img class="brand-logo" src="${esc(asset(LOGO))}" alt="Cala Laiya"></a><button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button><nav class="main-nav" aria-label="Main navigation">${nav.map(([label, path]) => `<a href="${path}" class="${current === path ? "active" : ""}">${label}</a>`).join("")}</nav><a class="button button-small header-book" href="/booking">BOOKING DEMO</a></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="footer-grid"><div><h3>ABOUT CALA LAIYA</h3><p>Nestled in a cove just 2.5 hours south of Manila, Cala Laiya is a tropical sanctuary that invites you to indulge in cozy accommodations situated in a pristine natural environment left unspoiled for you to discover.</p></div><div><h3>DISCOVER CALA LAIYA</h3><a href="/about">ABOUT CALA LAIYA</a><a href="/contact">GUEST REVIEWS</a><a href="/booking">BOOKING DEMO</a><a href="/rooms">ROOMS</a><a href="/gallery">GALLERY</a></div><div><h3>EXPERIENCE</h3>${["Day Beds", "Kids Activities", "Water Activities", "Banca", "Paddle Board", "Snorkeling", "Kayaking", "Banana Boat", "Boat Tours"].map((x) => `<a href="/activities">${x}</a>`).join("")}</div><div><h3>GET IN TOUCH</h3><p>Sitio Marulas, Laiya Ibabao, San Juan, Batangas, Philippines, 4226.</p><p>Phone: <a href="tel:+6309512472881">+63 09512472881</a></p><a href="mailto:${EMAIL}">${EMAIL}</a><div class="social"><a href="https://www.facebook.com/share/1F23dsioTT/?mibextid=wwXIfr" aria-label="Facebook">f</a></div></div></div><div class="copyright">Copyright ©2026 Cala Laiya. All Rights Reserved.</div></footer><a class="whatsapp-float" href="${WA_URL}" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><span>◉</span></a>`;
}
function pageBanner(title, sub, kicker, image) {
  const position =
    title === "Get in touch"
      ? "center 20%"
      : title === "Your perfect escape"
        ? "center 28%"
        : title === "GALLERY"
          ? "center 56%"
          : "center 50%";
  return `<section class="page-banner ${image ? "has-image" : ""}">${image ? `<div class="banner-photo" style="background-image:linear-gradient(90deg,rgba(8,24,30,.42),rgba(8,24,30,.12)),url('${asset(image)}');background-position:${position}"></div>` : ""}<div class="banner-copy"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}${kicker ? `<span class="eyebrow banner-foot">${kicker}</span>` : ""}</div></section>`;
}
function roomCard(room, index = 0) {
  return `<article class="room-card ${index % 2 ? "reverse" : ""}"><div class="room-copy"><span class="eyebrow copper">PROMOTIONAL RATE</span><h2>${room.name}</h2><p class="room-price">${money(room.price)} <small>/ night</small></p><ul class="room-facts"><li><strong>Maximum occupancy:</strong> ${room.capacity} guests</li><li><strong>Bedding:</strong> ${room.beds}</li><li><strong>Meals:</strong> ${inclusions[0]}</li></ul><p class="room-guest-rates"><strong>Additional guests:</strong> ${additionalGuestRates.join(" · ")}</p><p class="small-note">Additional guest charges apply when the number of guests exceeds the room’s standard occupancy.</p><div class="room-actions"><a class="text-link" href="/rooms/${room.slug}">VIEW DETAILS →</a><a class="text-link" href="/booking?room=${encodeURIComponent(room.id)}">TRY BOOKING DEMO →</a></div></div><a class="room-image" href="/rooms/${room.slug}" aria-label="${room.name}">${img(room.image, room.name)}<span class="image-count">${room.photos.length > 1 ? `+${room.photos.length - 1} more` : ""}</span></a></article>`;
}
function homePage() {
  const slide = heroSlides[activeHero];
  const review = reviews[activeReview];
  return `<main><section class="home-hero" style="background-image:linear-gradient(90deg,rgba(9,24,32,.44),rgba(12,35,41,.12)),url('${asset(slide.image)}')"><div class="hero-copy"><span class="eyebrow">${slide.title}</span><h1>CALA LAIYA</h1><i></i></div><button class="hero-control previous" aria-label="Previous">‹</button><button class="hero-control next" aria-label="Next">›</button><div class="hero-dots">${heroSlides.map((_, i) => `<button class="hero-dot ${i === activeHero ? "on" : ""}" data-slide="${i}" aria-label="Show slide ${i + 1}"></button>`).join("")}</div></section>
 <section class="intro-section"><div class="section-heading"><h2>Welcome Home</h2><p>Cala Laiya is a staycation and can accommodate guests of all ages.</p></div><div class="intro-text"><p>When in Cala Laiya, we greet all our guests with a sincere smile, a subtle nod, coupled with clasped hands. This courteous greeting is not just done as a welcome to every guest arriving at the resort; it is done each time a guest is encountered at any time of day, regardless of the number of encounters.</p><p>The nod – almost a half bow – acknowledges one's presence. Contact is minimal yet significant, polite, subtle, and respectful. The clasped hands – with one palm placed on top of the other – are symbolic of providing comfort and security. It is the Cala Laiya way of expressing our willingness to extend assistance and tireless service.</p></div></section>
 <section class="requirements"><div><span class="eyebrow copper">TRAVEL REQUIREMENTS</span>${link("/about", "FIND OUT MORE →", "button button-outline")}</div>${img(IMG("2025/01/Travel-Requirements-Template.png"), "Travel Requirements")}</section>
 <section class="stay-section"><div class="stay-photo">${img(IMG("2024/03/IMG_20231007_104739.jpg"), "Cala Laiya swimming pool")}</div><div class="stay-copy"><span class="eyebrow copper">TIME TO RECONNECT</span><h2>indulge in a cozy accommodation</h2><p>Nestled in a cove just 2.5 hours south of Manila, Cala Laiya is a tropical sanctuary that invites you to indulge in cozy accommodations situated in a pristine natural environment left unspoiled for you to discover.</p><a class="button" href="/booking">BOOK NOW →</a><div class="amenities">${[
   ["Free Wifi", "High speed internet available for each room."],
   ["Spa & Massage", "Therapeutic massage using oil by trained staff."],
   ["Water Activities", "Lots of premium water activities to choose from."],
   ["Day Trip", "Quick yet sweet escape does wonders to the soul."],
 ]
   .map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`)
   .join("")}</div></div></section>
 <section class="rooms-preview"><div class="section-heading"><span class="eyebrow copper">TIME TO RECONNECT</span><h2>Our Accommodations</h2><p>CalaLaiya Resort pairs roomy stays with practical comforts, warm hosting, and layouts suited for couples, families, and groups.</p></div><div class="preview-cards">${[rooms[0], rooms[1], rooms[2]].map((r) => `<article class="preview-card"><a href="/rooms/${r.slug}">${img(r.image, r.name)}</a><span class="eyebrow copper">PROMOTIONAL RATE</span><h3>${r.name}</h3><p>${money(r.price)} / night · ${r.beds} · Max ${r.capacity} guests</p><a href="/rooms/${r.slug}" class="text-link">VIEW ROOM</a></article>`).join("")}</div><a href="/rooms" class="button button-outline">SEE ALL ROOMS</a></section>
 <section class="activities-preview"><div class="section-heading"><span class="eyebrow copper">EXPERIENCE</span><h2>Activities</h2><p>CalaLaiya Resort keeps the shoreline lively with water adventures and easy group experiences.</p></div><div class="activity-cards">${activities
   .slice(0, 5)
   .map(
     (a) =>
       `<article class="activity-card"><a href="/activities">${img(a.image, a.name)}</a><a href="/activities" class="text-link">LEARN MORE</a><h3>${a.name}</h3><p>${a.description.split(".")[0]}.</p></article>`,
   )
   .join("")}</div></section>
 <section class="pool-feature" style="background-image:linear-gradient(rgba(8,29,38,.35),rgba(8,29,38,.38)),url('${asset("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920")}')"><div><span class="eyebrow">PREFERENCE</span><h2>Swimming Pool</h2><p>Choose your preference of swimming in a pool or in the open sea.</p><a href="/booking" class="button">BOOK NOW</a></div></section>
 <section class="restaurant-section"><div class="restaurant-copy"><span class="eyebrow copper">FRESH & TASTY</span><h2>Restaurant and Bar</h2><p>CalaLaiya Resort serves easy seaside favorites from breakfast to late-night bites, with fresh seafood, Filipino classics, and cold drinks after a day by the water.</p><a class="text-link" href="/activities">SEE MENU →</a></div><div class="food-grid">${["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800", "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800", "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"].map((u, i) => img(u, `Food ${i + 1}`)).join("")}</div></section>
 <section class="reviews-section"><span class="eyebrow copper">GUEST REVIEWS</span><h2>Your Opinion Matters</h2><article class="review-card"><span class="stars">★★★★★</span><h3>${review.title}</h3><p>${review.text}</p><div class="review-meta"><strong>${review.author}</strong><span>${review.date}</span></div></article><div class="review-controls"><button data-review="prev" aria-label="Previous">‹</button><button data-review="next" aria-label="Next">›</button></div><a class="text-link" href="/contact">GUEST REVIEWS →</a></section></main>`;
}
function aboutPage() {
  const casitas = rooms;
  return `<main>${pageBanner("Your perfect escape", "GET TO KNOW US BETTER", "ABOUT CALA LAIYA", IMG("2021/07/about-img-2.jpg"))}<section class="casitas-section"><div class="section-heading"><h2>ACCOMMODATIONS</h2></div><div class="casita-grid">${casitas.map((c) => `<article class="casita-card">${img(c.image, c.name)}<div class="capacity"><span>CAPACITY</span><strong>Good for ${c.capacity}</strong></div><div class="casita-caption"><div><h3>${c.name}</h3><p>${money(c.price)} / night · Max ${c.capacity} guests</p></div><a href="/rooms" class="text-link">SEE DETAILS →</a></div></article>`).join("")}</div></section><section class="about-explore"><div class="about-photo">${img(IMG("2021/07/about-img-2.jpg"), "Explore Cala Laiya")}<a href="/rooms" class="button">SEE OUR ROOMS →</a></div><div><span class="eyebrow copper">EXPLORE CALA LAIYA</span><h2>Need a break from the hustle and bustle of the city? Head south, unplug, and recharge.</h2><p>Only a 2.5 hour drive away from Manila, Cala Laiya is a tropical getaway nestled on Laiya, San Juan in Batangas. A panoramic view of Tayabas Bay and situated in front of the iconic marine sanctuary, Cala Laiya is ideal for exploring the wonders of the underwater world.</p><p>We offer spacious, cozy accommodation we call Casitas ('little house' in Spanish). Easy-breezy designs and eco-friendly amenities, our casitas are all walking distance to our dining areas, pools and the beach.</p><p>Cala Laiya offers a meticulously planned à la carte menu to cater to the palate of every vacationer ranging from Filipino favorites to International cuisine.</p><p>Our signature day-beds situated in front of the beach allows you to relax and enjoy the ocean horizon or gaze at a beautiful sunset.</p><p>Our outdoor activities include both motorized and non-motorized water sports. We also include a variety of outdoor games such as corn hole, badminton, and a mini playground for children to enjoy.</p><a href="/booking" class="text-link">BOOK TO UNWIND NOW →</a></div></section><section class="facilities"><article>${img(IMG("2021/07/explore-bananaboat.jpg"), "Aqua Sports")}<span class="eyebrow copper">OPERATING HOURS : 8AM - 5PM</span><h2>Aqua Sports</h2><a href="/activities" class="text-link">Please click here for more details</a></article><div><span class="eyebrow copper">SERVICES & FACILITIES</span><div class="facility-pair"><article>${img(IMG("2021/06/pool.jpg"), "Infinity Pool")}<span class="eyebrow copper">OPERATING HOURS : 7AM - 7PM</span><h3>Infinity Pool</h3><p>Dive in and relax. Here at Cala Laiya you can swim in the cool waters of our pools while being surrounded by a breathtaking view of Tayabas Bay. We have two infinity pools right by the beach. It is the perfect place to get some sun.</p></article><article>${img(IMG("2021/07/117A2832-min.jpg"), "Restaurant")}<span class="eyebrow copper">OPERATING HOURS : 6AM - 10PM</span><h3>Restaurant</h3><p>Our menu offers a delicious variety of cuisines from Filipino favourites to international dishes. Enjoy them at the restaurant, on our day beds, in the casitas or by the beach.</p></article></div></div></section><section class="puppy-section"><div><h2>The Pampered Puppy</h2><p>We at Cala Laiya know that your dogs are more than pets, they are members of the family. We offer a variety of amenities to ensure their stay with us is enjoyable as your own. Kindly contact our Front Office to request for a comfortable bed for your dog, which will be accompanied with a dog treat and a gleaming generously sized water bowl.</p><p>As comfortable as your dog will be in his room, a walk around the resort will also contribute to his comfort. Please speak to our Front Office to arrange to have your dog walked.</p><p>We offer a complete range of IAMS quality dry food to accommodate any dietary need.</p><a class="text-link" href="/contact">SEE MORE</a></div>${img(IMG("2021/08/pampered-puppy.jpg"), "Pampered Puppy")}</section></main>`;
}
function roomsPage(title = "Accommodation Rates & Room Information") {
  const groupedRooms = roomCategories.map((category) => `<section class="room-category"><div class="room-category-heading"><span class="eyebrow copper">CALA LAIYA ACCOMMODATIONS</span><h2>${category}</h2></div>${rooms.filter((room) => room.category === category).map((room, index) => roomCard(room, index)).join("")}</section>`).join("");
  return `<main>${pageBanner(title, "Discounted promotional rates · Per night", "ROOMS & RATES", IMG("2021/07/banner-room.jpg"))}<section class="rooms-list"><p class="room-rate-intro">All rates listed below are promotional rates and include daily buffet breakfast, lunch, and dinner.</p>${groupedRooms}<section class="additional-guest-panel"><h2>Additional Guest Rates</h2><ul>${additionalGuestRates.map((rate) => `<li>${rate}</li>`).join("")}</ul><p>Additional guest charges apply when the number of guests exceeds the room’s standard occupancy. Children aged 6 and below stay free of charge.</p></section><p class="small-note">All accommodation rates are quoted per night. This unofficial website demo does not check live availability or create real reservations.</p></section></main>`;
}
function roomDetailPage(room) {
  return `<main>${pageBanner(room.name, "Promotional rate · Per night", room.category, room.image)}<section class="detail-layout"><div class="detail-gallery">${room.photos.map((u, i) => `<button class="detail-photo" data-lightbox="${i}">${img(u, `${room.name} ${i + 1}`)}</button>`).join("")}</div><div class="detail-copy"><span class="eyebrow copper">PROMOTIONAL RATE</span><h2>${room.name}</h2><p class="room-price">${money(room.price)} <small>/ night</small></p><h3>ROOM INFORMATION</h3><ul><li>Maximum occupancy: ${room.capacity} guests</li><li>Bedding: ${room.beds}</li><li>Includes daily buffet breakfast, lunch, and dinner</li></ul><h3>ADDITIONAL GUEST RATES</h3><ul>${additionalGuestRates.map((rate) => `<li>${rate}</li>`).join("")}</ul><p class="small-note">Additional guest charges apply when the number of guests exceeds the room’s standard occupancy. Children aged 6 and below stay free of charge. This is a demo; check with the resort to confirm details.</p><a class="button" href="/booking?room=${encodeURIComponent(room.id)}">TRY BOOKING DEMO</a></div></section></main>`;
}
function activitiesPage() {
  return `<main>${pageBanner("Explore Cala Laiya", "What We Offer", "Experience", IMG("2021/07/banner-exp.jpg"))}<section class="activities-list">${activities.map((a, i) => `<article class="activity-row ${i % 2 ? "reverse" : ""}"><div class="activity-photo">${img(a.image, a.name)}${!["Massage Services"].includes(a.name) ? `<button class="see-gallery" data-activity="${i}">SEE GALLERY</button>` : ""}</div><div class="activity-copy"><span class="eyebrow copper">OPERATING HOURS : ${a.hours}</span><h2>${a.name}</h2><p>${a.description}</p>${a.extra ? `<p class="activity-extra">${a.extra}</p>` : ""}${["Balsa Raft", "Boat Tours"].includes(a.name) ? `<p class="small-note">* For inquiries and reservations please contact us at <a href="tel:+6309512472881">+63 09512472881</a> or <a href="mailto:${EMAIL}">${EMAIL}</a></p>` : ""}</div></article>`).join("")}</section></main>`;
}
function galleryPage() {
  return `<main>${pageBanner("GALLERY", "", "", IMG("2021/07/DSC_0967-min-scaled.jpg"))}<section class="gallery-grid">${gallery.map((g, i) => `<button class="gallery-item" data-lightbox="${i}">${img(g.image, g.alt)}<span>+</span></button>`).join("")}</section></main>`;
}
function contactPage() {
  return `<main>${pageBanner("Get in touch", "Inquiries & questions", "Contact Us", IMG("2022/09/IMG_0124-1.jpg"))}<section class="contact-section"><div class="contact-details"><h2>Cala Laiya</h2><p>Sitio Marulas, Laiya Ibabao, San Juan, Batangas, Philippines, 4226.</p><p><strong>Phone:</strong> <a href="tel:+6309512472881">${PHONE}</a></p><p><a href="mailto:${EMAIL}">${EMAIL}</a></p><h3>Amenities:</h3><ul>${["Free parking", "Pool", "Bar / Lounge", "Restaurant", "Beach", "Children Activities", "Pet Accepted", "Non-motorized water sport activities"].map((x) => `<li>${x}</li>`).join("")}</ul></div><form class="contact-form" id="contact-form"><h2>Demo Contact Form</h2><p>This form is for the demo only. Use fictional details; nothing is sent or saved.</p><input type="hidden" name="requestType" value="Contact inquiry"><input type="hidden" name="_subject" value="Cala Laiya Contact Inquiry"><label>FULL NAME<input name="name" type="text" required autocomplete="name"></label><label>EMAIL ADDRESS<input name="email" type="email" required autocomplete="email" inputmode="email" placeholder="you@example.com"></label><label>CONTACT NO.<input name="phone" type="tel" required autocomplete="tel"></label><label>MESSAGE<textarea name="message" rows="6" required></textarea></label><p class="small-note">* Demo only. No contact details are emailed or stored.</p><span class="contact-status" id="contact-status" role="status" aria-live="polite"></span><button type="submit" class="button" data-send-inquiry>TEST CONTACT FORM</button></form></section></main>`;
}
function promotionsPage() {
  return roomsPage("Promotional Accommodation Rates");
}
function bookingDateLabel(d) {
  return d
    ? d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";
}
function bookingDateKey(d) {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function roomChoicesMarkup() {
  const nights =
    chosenDates.checkIn && chosenDates.checkOut
      ? Math.max(1, Math.round((chosenDates.checkOut - chosenDates.checkIn) / 86400000))
      : 1;
  return `<div class="room-choice"><div class="room-choice-head"><div><span class="eyebrow copper">YOUR STAY</span><h2>Choose Your Room</h2><p class="muted">${bookingDateLabel(chosenDates.checkIn)} – ${bookingDateLabel(chosenDates.checkOut)} · ${nights} ${nights === 1 ? "night" : "nights"}</p></div><button class="change-dates" type="button" data-change-dates>‹ Change dates</button></div><div class="room-choice-grid">${rooms.map((r) => `<article class="room-choice-card"><a href="/rooms/${r.slug}" class="room-choice-image" aria-label="View ${r.name}">${img(r.image, r.name)}<span>RESORT STAY</span></a><div class="room-choice-copy"><span class="eyebrow copper">${r.name.includes("Villa") ? "PRIVATE POOL VILLA" : "CASITA"}</span><h3>${r.name}</h3><p>${r.beds}</p><p class="room-choice-extra">Includes daily buffet breakfast, lunch, and dinner.</p><p class="room-capacity">Maximum occupancy: ${r.capacity} guests</p><p class="room-choice-extra">Extra guests: adults ₱1,500; ages 7–12 ₱1,000; ages 6 and under free.</p><div class="room-choice-price"><strong>${money(r.price)}</strong><small>/ night</small></div><button class="button room-book-button" type="button" data-room-id="${r.id}">CHECK SAMPLE AVAILABILITY</button></div></article>`).join("")}</div></div>`;
}
function bookingPage() {
  const q = new URLSearchParams(location.search);
  const initialId = q.get("room");
  const initialCheckIn = q.get("checkin");
  const initialCheckOut = q.get("checkout");
  if (initialCheckIn && initialCheckOut) {
    const checkIn = new Date(`${initialCheckIn}T12:00:00`);
    const checkOut = new Date(`${initialCheckOut}T12:00:00`);
    if (!Number.isNaN(checkIn.getTime()) && !Number.isNaN(checkOut.getTime()))
      chosenDates = { checkIn, checkOut };
  }
  const requestedGuests = Number(q.get("guests"));
  if (Number.isInteger(requestedGuests) && requestedGuests >= 1 && requestedGuests <= 20)
    selectedGuests = requestedGuests;
  selectedRoom = initialId ? rooms.find((r) => r.id === initialId) || null : null;
  const month = chosenMonth,
    first = new Date(month.getFullYear(), month.getMonth(), 1),
    days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(),
    start = first.getDay();
  const cells = Array(start)
    .fill('<span class="calendar-blank"></span>')
    .concat(
      Array.from({ length: days }, (_, i) => {
        const d = new Date(month.getFullYear(), month.getMonth(), i + 1);
        const key = bookingDateKey(d);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const disabled = d < today;
        const selected =
          (chosenDates.checkIn && key === bookingDateKey(chosenDates.checkIn)) ||
          (chosenDates.checkOut && key === bookingDateKey(chosenDates.checkOut));
        const inRange =
          chosenDates.checkIn &&
          chosenDates.checkOut &&
          d > chosenDates.checkIn &&
          d < chosenDates.checkOut;
        return `<button class="calendar-day ${disabled ? "past" : ""} ${selected ? "selected" : ""} ${inRange ? "in-range" : ""}" data-date="${key}" ${disabled ? "disabled" : ""}>${i + 1}</button>`;
      }),
    );
  const step = bookingStage === "rooms" ? 1 : 0;
  return `<main><section class="booking-hero" style="background-image:linear-gradient(90deg,rgba(8,24,30,.62),rgba(8,24,30,.14)),url('${asset("https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920")}')"><div><span class="eyebrow">RESERVATION DEMO</span><h1>Try the Booking Flow</h1><p class="demo-booking-note">Demo only: dates and room availability are samples. No booking or payment is created.</p></div></section><div class="booking-steps">${["Select Dates", "Choose Room", "Guest Details", "Demo Payment"].map((x, i) => `<span class="${i === step ? "current" : ""}"><b>${i + 1}</b>${x}</span>`).join("")}</div>${bookingStage === "rooms" ? `<section class="booking-body room-results">${roomChoicesMarkup()}</section>` : `<section class="booking-body"><div><h2>Select Demo Dates</h2><p class="muted">Choose sample dates to preview the booking steps. No real availability is checked.</p><div class="calendar-head"><button data-month="prev" aria-label="Previous month">‹</button><div><span class="eyebrow copper">SELECT CHECK-IN DATE</span><h3>${month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3></div><button data-month="next" aria-label="Next month">›</button></div><div class="calendar-grid">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((x) => `<span class="day-name">${x}</span>`).join("")}${cells.join("")}</div><div class="calendar-legend"><span><i class="legend-selected"></i>Selected</span><span><i class="legend-range"></i>Your Stay</span><span><i class="legend-past"></i>Past</span></div></div><aside class="trip-card"><h3>Demo Trip Details</h3><div><small>CHECK-IN</small><strong>${bookingDateLabel(chosenDates.checkIn)}</strong></div><div><small>CHECK-OUT</small><strong>${bookingDateLabel(chosenDates.checkOut)}</strong></div><label>NUMBER OF GUESTS<select id="guests">${Array.from({ length: 20 }, (_, i) => `<option value="${i + 1}" ${i + 1 === selectedGuests ? "selected" : ""}>${i + 1} ${i === 0 ? "guest" : "guests"}</option>`).join("")}</select></label>${selectedRoom ? `<p class="selected-room">${selectedRoom.name} · ${money(selectedRoom.price)} / night (sample rate)</p>` : ""}<button class="button booking-choose" ${!chosenDates.checkIn || !chosenDates.checkOut ? "disabled" : ""}>CHOOSE DEMO ROOM <span>›</span></button></aside></section>`}</main>`;
}
function render() {
  const pageParam = new URLSearchParams(location.search).get("page");
  const routeFromQuery = pageParam
    ? pageParam === "home"
      ? "/"
      : `/${pageParam.replace(/^\/+/, "")}`
    : "";
  const route = routeFromQuery || location.pathname.replace(/\/$/, "") || "/";
  let content;
  if (route === "/") content = homePage();
  else if (route === "/about") content = aboutPage();
  else if (route === "/rooms") content = roomsPage();
  else if (route === "/rooms/promos") content = promotionsPage();
  else if (route === "/activities") content = activitiesPage();
  else if (route === "/gallery") content = galleryPage();
  else if (route === "/contact") content = contactPage();
  else if (route === "/booking" || route === "/booking/continue") content = bookingPage();
  else if (route.startsWith("/rooms/")) {
    const room = rooms.find((r) => `/rooms/${r.slug}` === route);
    content = room ? roomDetailPage(room) : roomsPage();
  } else content = homePage();
  document.querySelector("#app").innerHTML = header() + '<div class="demo-banner" role="note"><strong>UNOFFICIAL DEMO ONLY</strong> — Not connected to the resort’s booking system. No live availability, reservations, emails, payments, or receipt uploads.</div>' + content + footer();
  document.title = `${route === "/" ? "Cala Laiya Beach Resort" : rooms.find((r) => `/rooms/${r.slug}` === route)?.name || { about: "About Cala Laiya", rooms: "Our Rooms", "rooms/promos": "Accommodation", activities: "Activities", gallery: "Gallery", contact: "Contact Us", booking: "Book Your Stay" }[route.slice(1)] || "Cala Laiya Beach Resort"} | Cala Laiya`;
  bindEvents();
  window.scrollTo(0, 0);
}
function navigate(to) {
  history.pushState({}, "", to);
  render();
}
function bindEvents() {
  document.querySelectorAll('a[href^="/"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigate(a.getAttribute("href"));
    }),
  );
  const menu = document.querySelector(".menu-toggle");
  if (menu)
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!open));
      document.querySelector(".main-nav").classList.toggle("open", !open);
    });
  document.querySelector(".hero-control.previous")?.addEventListener("click", () => {
    activeHero = (activeHero + heroSlides.length - 1) % heroSlides.length;
    render();
  });
  document.querySelector(".hero-control.next")?.addEventListener("click", () => {
    activeHero = (activeHero + 1) % heroSlides.length;
    render();
  });
  document.querySelectorAll(".hero-dot").forEach((b) =>
    b.addEventListener("click", () => {
      activeHero = Number(b.dataset.slide);
      render();
    }),
  );
  document.querySelector('[data-review="prev"]')?.addEventListener("click", () => {
    activeReview = (activeReview + reviews.length - 1) % reviews.length;
    render();
  });
  document.querySelector('[data-review="next"]')?.addEventListener("click", () => {
    activeReview = (activeReview + 1) % reviews.length;
    render();
  });
  document.querySelectorAll("[data-lightbox]").forEach((b) =>
    b.addEventListener("click", () => {
      lightboxItems =
        location.pathname === "/gallery"
          ? gallery.map((g) => g.image)
          : rooms.find((r) => location.pathname.endsWith(r.slug))?.photos || [];
      lightboxIndex = Number(b.dataset.lightbox);
      showLightbox();
    }),
  );
  document.querySelectorAll("[data-activity]").forEach((b) =>
    b.addEventListener("click", () => {
      lightboxItems = [activities[Number(b.dataset.activity)].image];
      lightboxIndex = 0;
      showLightbox();
    }),
  );
  document.querySelector('[data-month="prev"]')?.addEventListener("click", () => {
    chosenMonth = new Date(chosenMonth.getFullYear(), chosenMonth.getMonth() - 1, 1);
    render();
  });
  document.querySelector('[data-month="next"]')?.addEventListener("click", () => {
    chosenMonth = new Date(chosenMonth.getFullYear(), chosenMonth.getMonth() + 1, 1);
    render();
  });
  document.querySelectorAll(".calendar-day:not(.past)").forEach((b) =>
    b.addEventListener("click", () => {
      const d = new Date(`${b.dataset.date}T12:00:00`);
      if (!chosenDates.checkIn || chosenDates.checkOut || d <= chosenDates.checkIn) {
        chosenDates = { checkIn: d, checkOut: null };
      } else chosenDates.checkOut = d;
      render();
    }),
  );
  document.querySelector("#guests")?.addEventListener("change", (event) => {
    selectedGuests = Number(event.currentTarget.value || 1);
  });
  document.querySelector(".booking-choose")?.addEventListener("click", () => {
    if (!chosenDates.checkIn || !chosenDates.checkOut) return;
    selectedGuests = Number(document.querySelector("#guests")?.value || selectedGuests || 1);
    bookingStage = "rooms";
    render();
  });
  document.querySelector("[data-change-dates]")?.addEventListener("click", () => {
    bookingStage = "dates";
    render();
  });
  document.querySelectorAll("[data-room-id]").forEach((button) =>
    button.addEventListener("click", () => {
      selectedRoom = rooms.find((r) => r.id === button.dataset.roomId) || null;
      if (selectedRoom) showRoomBookingModal(selectedRoom);
    }),
  );
  const form = document.querySelector("#contact-form");
  if (form) {
    const status = form.querySelector("#contact-status");
    const setStatus = (message, error = false) => {
      status.textContent = message;
      status.classList.toggle("is-error", error);
    };
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      setStatus("Demo only: no inquiry was emailed or stored. Use fictional details only.");
      form.reset();
    });
  }
}
function showBookingToast(message) {
  document.querySelector(".booking-toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "booking-toast";
  toast.setAttribute("role", "status");
  toast.innerHTML = `<strong>Booking update</strong><span>${message}</span>`;
  document.body.append(toast);
  setTimeout(() => toast.remove(), 7000);
}
function showWelcomePromo() {
  try {
    if (window.sessionStorage.getItem("calaWelcomePromoDismissed")) return;
  } catch {
    // Continue without session storage if the browser blocks it.
  }

  const room = rooms[0];
  const overlay = document.createElement("div");
  overlay.className = "welcome-promo-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Cala Laiya welcome offer");
  overlay.innerHTML = `<section class="welcome-promo-card"><div class="welcome-promo-copy"><span class="eyebrow copper">UNOFFICIAL BOOKING DEMO</span><h2>PROMOTIONAL RATES</h2><p>Preview accommodation details and promotional rates in this demo.</p><p>${room.name}: <strong>${money(room.price)} per night</strong>.</p><button class="button welcome-promo-book" type="button" data-promo-book>TRY BOOKING DEMO</button><button class="welcome-promo-rooms" type="button" data-promo-rooms>VIEW ALL ROOMS</button></div><div class="welcome-promo-photo">${img(room.image, room.name)}<button class="welcome-promo-close" type="button" aria-label="Close offer">×</button></div></section>`;
  document.body.append(overlay);

  const close = () => {
    try {
      window.sessionStorage.setItem("calaWelcomePromoDismissed", "1");
    } catch {
      // Dismiss the popup for this page view even when storage is unavailable.
    }
    overlay.remove();
  };
  overlay.querySelector(".welcome-promo-close").onclick = close;
  overlay.querySelector("[data-promo-book]").onclick = () => {
    close();
    navigate(`/booking?room=${encodeURIComponent(room.id)}`);
  };
  overlay.querySelector("[data-promo-rooms]").onclick = () => {
    close();
    navigate("/rooms");
  };
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  overlay.querySelector(".welcome-promo-close").focus();
}

function showRoomBookingModal(room) {
  document.querySelector(".room-booking-modal")?.remove();
  const nights =
    chosenDates.checkIn && chosenDates.checkOut
      ? Math.max(1, Math.round((chosenDates.checkOut - chosenDates.checkIn) / 86400000))
      : 1;
  const dialog = document.createElement("div");
  dialog.className = "room-booking-modal";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", `Booking details for ${room.name}`);
  dialog.innerHTML = `<div class="room-modal-card"><div class="room-modal-copy"><button class="room-modal-close" type="button" aria-label="Close">×</button><span class="eyebrow copper">UNOFFICIAL BOOKING DEMO</span><h2>Preview your stay.</h2><p>Continue to see a sample availability result and test the guest-details and payment screens. No live inventory is checked and nothing is sent or booked.</p><div class="room-modal-summary"><span>ROOM<strong>${room.name}</strong></span><span>CHECK-IN<strong>${bookingDateLabel(chosenDates.checkIn)}</strong></span><span>CHECK-OUT<strong>${bookingDateLabel(chosenDates.checkOut)}</strong></span><span>SAMPLE RATE<strong>${money(room.price)} × ${nights} ${nights === 1 ? "night" : "nights"}</strong></span></div><button class="button room-modal-book" type="button">CHECK SAMPLE AVAILABILITY</button><button class="room-modal-browse" type="button">VIEW ALL ROOMS</button><small>Demo only — no real availability check, reservation, email, payment, or receipt upload.</small></div><div class="room-modal-photo">${img(room.image, room.name)}</div></div>`;
  document.body.append(dialog);
  const close = () => dialog.remove();
  dialog.querySelector(".room-modal-close").onclick = close;
  dialog.querySelector(".room-modal-browse").onclick = close;
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) close();
  });
  dialog.querySelector(".room-modal-book").onclick = () => {
    const params = new URLSearchParams({
      roomId: room.id,
      roomName: room.name,
      checkIn: bookingDateKey(chosenDates.checkIn),
      checkOut: bookingDateKey(chosenDates.checkOut),
      guests: String(selectedGuests || 1),
      rate: String(room.price),
    });
    close();
    window.location.href = `/payment-instructions.html?${params.toString()}`;
  };
  dialog.querySelector(".room-modal-close").focus();
}
function showLightbox() {
  if (!lightboxItems.length) return;
  document.querySelector(".lightbox")?.remove();
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `<button class="lightbox-close" aria-label="Close">×</button><button class="lightbox-prev" aria-label="Previous">‹</button><img src="${asset(lightboxItems[lightboxIndex])}" alt="Gallery image"><button class="lightbox-next" aria-label="Next">›</button><div class="lightbox-count">${lightboxIndex + 1} / ${lightboxItems.length}</div>`;
  document.body.append(box);
  const move = (d) => {
    lightboxIndex = (lightboxIndex + d + lightboxItems.length) % lightboxItems.length;
    box.querySelector("img").src = asset(lightboxItems[lightboxIndex]);
    box.querySelector(".lightbox-count").textContent =
      `${lightboxIndex + 1} / ${lightboxItems.length}`;
  };
  box.querySelector(".lightbox-close").onclick = () => box.remove();
  box.querySelector(".lightbox-prev").onclick = () => move(-1);
  box.querySelector(".lightbox-next").onclick = () => move(1);
  box.addEventListener("click", (e) => {
    if (e.target === box) box.remove();
  });
}
function mountGuestHelp() {
  if (document.querySelector(".guest-help")) return;
  const root = document.createElement("aside");
  root.className = "guest-help";
  root.innerHTML = `<button class="guest-help-toggle" type="button" aria-expanded="false" aria-controls="guest-help-panel">Guest help</button><section class="guest-help-panel" id="guest-help-panel" hidden><div class="guest-help-head"><strong>Cala Laiya Guest Help</strong><button type="button" aria-label="Close help">×</button></div><p class="guest-help-intro">I can help with common questions. Choose a topic or type your question.</p><div class="guest-help-quick">${["Booking & dates", "Check-in / check-out", "Rooms & capacity", "Resort location", "Talk to staff"].map((x) => `<button type="button">${x}</button>`).join("")}</div><div class="guest-help-messages" aria-live="polite"><p class="assistant-message">Hi! How can I help with your stay?</p></div><form class="guest-help-form"><input name="question" aria-label="Ask a question" placeholder="Type your question…" required><button type="submit" aria-label="Send question">Send</button></form></section>`;
  document.body.append(root);
  const panel = root.querySelector(".guest-help-panel"),
    toggle = root.querySelector(".guest-help-toggle"),
    messages = root.querySelector(".guest-help-messages");
  const show = () => {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  };
  const hide = () => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.onclick = () => (panel.hidden ? show() : hide());
  root.querySelector(".guest-help-head button").onclick = hide;
  const answer = (q) => {
    const t = q.toLowerCase();
    if (/\b(time|hour|when)\b|check.?in.*time|check.?out.*time/.test(t))
      return "The published check-in time is 2:00 PM and check-out is 12:00 NN. Please contact the resort to confirm details for your specific reservation.";
    if (/book|reserv|date|check.?in|check.?out/.test(t))
      return "Select dates and a room on the Book Your Stay page, then submit a manual reservation request. The resort must confirm availability; this site does not create a confirmed reservation.";
    if (/room|villa|casita|guest|capacity|bed/.test(t))
      return "Room capacities and bed details are shown on each room card and room detail page. Choose your dates first to see all available room options.";
    if (/where|location|address|direction|map/.test(t))
      return "Cala Laiya is at Sitio Marulas, Laiya Ibabao, San Juan, Batangas, Philippines, 4226.";
    if (/staff|person|human|issue|problem|help|contact|cancel|payment|pay/.test(t))
      return `For account-specific or urgent help, call ${PHONE} or email ${EMAIL}. The chat cannot access reservations or process payments.`;
    return `I can help with booking dates, rooms, location, and check-in/out. For this question or a reservation-specific issue, please call ${PHONE} or email ${EMAIL}.`;
  };
  const send = (q) => {
    const value = String(q || "").trim();
    if (!value) return;
    const user = document.createElement("p");
    user.className = "user-message";
    user.textContent = value;
    messages.append(user);
    const reply = document.createElement("p");
    reply.className = "assistant-message";
    reply.textContent = answer(value);
    messages.append(reply);
    messages.scrollTop = messages.scrollHeight;
  };
  root.querySelectorAll(".guest-help-quick button").forEach(
    (b) =>
      (b.onclick = () => {
        show();
        send(b.textContent);
      }),
  );
  root.querySelector(".guest-help-form").onsubmit = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.question;
    send(input.value);
    input.value = "";
  };
}
async function init() {
  try {
    imageMap = await fetch("/assets/image-map.json").then((r) => (r.ok ? r.json() : {}));
  } catch {
    imageMap = {};
  }
  render();
  mountGuestHelp();
  window.setTimeout(showWelcomePromo, 900);
}
window.addEventListener("popstate", render);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".lightbox")?.remove();
    document.querySelector(".welcome-promo-close")?.click();
  }
  if (document.querySelector(".lightbox") && e.key === "ArrowRight") {
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    showLightbox();
  }
  if (document.querySelector(".lightbox") && e.key === "ArrowLeft") {
    lightboxIndex = (lightboxIndex + lightboxItems.length - 1) % lightboxItems.length;
    showLightbox();
  }
});
init();
