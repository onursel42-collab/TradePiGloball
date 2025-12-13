// assets/js/data.fake.js
export const CATEGORIES = [
  { id: "electronics", label: "Electronics" },
  { id: "furniture", label: "Furniture" },
  { id: "apparel", label: "Apparel" },
  { id: "industrial", label: "Industrial" },
  { id: "beauty", label: "Beauty" },
  { id: "automotive", label: "Automotive" },
  { id: "food", label: "Food & Beverage" },
  { id: "packaging", label: "Packaging" },
];

export const SHOWROOMS_BY_CATEGORY = {
  electronics: [
    demo("anatolia-electronics", "Anatolia Electronics", "Verified", "MOQ 50", "Lead 5–10 days"),
    demo("shenzhen-parts", "Shenzhen Pro Parts", "Verified", "MOQ 100", "Lead 7–12 days"),
    demo("istanbul-oem", "Istanbul OEM Hub", "Pending", "MOQ 30", "Lead 3–8 days"),
    demo("eu-sourcing", "EU Sourcing Desk", "Verified", "MOQ 20", "Lead 6–14 days"),
  ],
  furniture: [
    demo("aegean-wood", "Aegean Woodworks", "Verified", "MOQ 10", "Lead 10–20 days"),
    demo("bursa-home", "Bursa Home Studio", "Verified", "MOQ 25", "Lead 8–15 days"),
    demo("modern-living", "Modern Living Co.", "Pending", "MOQ 15", "Lead 12–22 days"),
  ],
  apparel: [
    demo("anatolia-textiles", "Anatolia Textiles", "Verified", "MOQ 100", "Lead 7–12 days"),
    demo("istanbul-knit", "Istanbul Knit Lab", "Verified", "MOQ 200", "Lead 10–18 days"),
    demo("ege-denim", "Ege Denim Works", "Pending", "MOQ 150", "Lead 12–20 days"),
  ],
  industrial: [
    demo("machinery-tr", "TR Machinery Group", "Verified", "MOQ 1", "Lead 14–30 days"),
    demo("precision-cnc", "Precision CNC House", "Verified", "MOQ 5", "Lead 10–25 days"),
    demo("oem-components", "OEM Components", "Pending", "MOQ 50", "Lead 12–28 days"),
  ],
  beauty: [
    demo("aegean-cosmetics", "Aegean Cosmetics", "Verified", "MOQ 500", "Lead 7–15 days"),
    demo("lab-formulas", "Lab Formulas Co.", "Pending", "MOQ 300", "Lead 10–18 days"),
    demo("natural-care", "Natural Care Studio", "Verified", "MOQ 200", "Lead 8–16 days"),
  ],
  automotive: [
    demo("auto-parts-tr", "Auto Parts TR", "Verified", "MOQ 100", "Lead 6–12 days"),
    demo("garage-oem", "Garage OEM Supply", "Pending", "MOQ 150", "Lead 10–16 days"),
    demo("euro-motors", "Euro Motors Desk", "Verified", "MOQ 80", "Lead 7–14 days"),
  ],
  food: [
    demo("mediterranean-foods", "Mediterranean Foods", "Verified", "MOQ 1000", "Lead 5–9 days"),
    demo("bulk-spices", "Bulk Spices Co.", "Pending", "MOQ 500", "Lead 7–12 days"),
    demo("premium-dates", "Premium Dates Hub", "Verified", "MOQ 300", "Lead 6–10 days"),
  ],
  packaging: [
    demo("packaging-pro", "Packaging Pro", "Verified", "MOQ 1000", "Lead 10–18 days"),
    demo("eco-boxes", "Eco Boxes Studio", "Verified", "MOQ 800", "Lead 9–16 days"),
    demo("label-print", "Label Print Lab", "Pending", "MOQ 2000", "Lead 8–14 days"),
  ],
};

function demo(id, name, badge, moq, lead) {
  return {
    id,
    name,
    badge,
    moq,
    lead,
    country: "TR",
    desc: "Verified catalogs, clear MOQ/lead times, RFQ-ready flow (demo).",
  };
}
