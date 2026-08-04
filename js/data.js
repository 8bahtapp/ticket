/* Mock data only — no backend. Concept/demo purposes. */

/* ---- Org structure: Team group -> Team code -> Product ---- */
const PRODUCT_CATALOG = [
  { group:"Software", team:"MIS",     product:"SOLIDWORKS" },
  { group:"Software", team:"MIS",     product:"SolidCAM" },
  { group:"Software", team:"Ci2D",    product:"GstarCAD" },
  { group:"Software", team:"Ci3D",    product:"Archicad" },
  { group:"Software", team:"Ci8baht", product:"AutoCAD" },
  { group:"Hardware", team:"MIH",     product:"MAKERBOT" },
  { group:"Hardware", team:"MIH",     product:"Shining 3D Scanner" },
  { group:"Hardware", team:"MIH",     product:"3Dconnexion" },
  { group:"Service",  team:"MIS",     product:"Human Service" },
];

const TEAMS = [
  { code:"MIS",     label:"MIS", groups:["Software","Service"] },
  { code:"Ci2D",    label:"Ci2D", groups:["Software"] },
  { code:"Ci3D",    label:"Ci3D", groups:["Software"] },
  { code:"Ci8baht", label:"Ci8baht", groups:["Software"] },
  { code:"MIH",     label:"MIH", groups:["Hardware"] },
];

const MOCK_USERS = {
  admin:      { name:"คุณจักกิต",     role:"admin",      roleLabel:"Admin",      team:"ทั้งหมด",    initials:"JK" },
  supervisor: { name:"คุณพิมพ์ชนก",   role:"supervisor",  roleLabel:"Supervisor",  team:"Ci8baht", initials:"PC" },
  agent:      { name:"คุณธีรภัทร",    role:"agent",       roleLabel:"Agent",       team:"Ci8baht", initials:"TP" },
};

/* ---- Status vocabulary ----
   new          ใหม่
   in_progress  กำลังดำเนินการ
   pending      รอดำเนินการ   (requires a reason)
   cancel       ยกเลิก        (requires a reason)
   closed       ปิดเคส        (requires a summary, sent to customer + sales)
   `breach` is a separate overdue flag, not a status. */

const MOCK_TICKETS = [
  { id:"TCK-10231", company:"บริษัท กรีนบิลด์ ดีไซน์ จำกัด", status:"in_progress", breach:true, priority:"สูง",
    team:"Ci8baht", product:"AutoCAD", assignee:"ธีรภัทร", sales:"คุณกิตติ (เซลดูแลบัญชี)",
    channel:"LINE OA", email:"purchase@greenbuild.co.th", phone:"081-234-5678",
    preview:"AutoCAD เปิดไม่ติด ขึ้น error ตั้งแต่เช้า...", time:"07:12", waiting:"42 นาที",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"07:12"},
      {type:"customer", text:"AutoCAD เปิดไม่ติดครับ ขึ้น error ตั้งแต่เช้า รีบใช้งานพรีเซนต์ลูกค้า 10 โมงนี้", time:"07:12"},
      {type:"agent", who:"ธีรภัทร", text:"รับทราบครับ ขอ screenshot อาการ error หน่อยได้ไหมครับ", time:"07:15"},
      {type:"internal", who:"ธีรภัทร", text:"@ทีม License เคสนี้ลูกค้า license อาจหมดอายุ ช่วยเช็ค portal ให้หน่อยครับ", time:"07:16"},
    ] },
  { id:"TCK-10230", company:"หจก. โฟกัส เอ็นจิเนียริ่ง", status:"pending", breach:false, priority:"กลาง",
    team:"MIS", product:"SOLIDWORKS", assignee:"ธีรภัทร", sales:"คุณอรวรรณ (เซลดูแลบัญชี)",
    channel:"เว็บไซต์", email:"it@focuseng.co.th", phone:"02-345-6789",
    preview:"สอบถามการต่ออายุ SOLIDWORKS ปีนี้...", time:"09:40", waiting:"18 นาที",
    pendingReason:"รอฝ่ายจัดซื้อของลูกค้ายืนยัน PO ก่อนดำเนินการต่ออายุ",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"09:40"},
      {type:"customer", text:"อยากสอบถามการต่ออายุ SOLIDWORKS ของบริษัทครับ ใกล้หมดอายุแล้ว", time:"09:41"},
      {type:"system", text:"เปลี่ยนสถานะเป็น รอดำเนินการ — เหตุผล: รอฝ่ายจัดซื้อของลูกค้ายืนยัน PO ก่อนดำเนินการต่ออายุ", time:"09:55"},
    ] },
  { id:"TCK-10229", company:"บริษัท ทรีดี วิสัวไลซ์ จำกัด", status:"new", breach:false, priority:"ต่ำ",
    team:"MIH", product:"Shining 3D Scanner", assignee:"ยังไม่มอบหมาย", sales:"คุณนภัส (เซลดูแลบัญชี)",
    channel:"LINE OA", email:"studio@3dvisualize.co.th", phone:"089-111-2233",
    preview:"เครื่องสแกน 3 มิติ สแกนแล้วพื้นผิวไม่เนียน...", time:"09:58", waiting:"2 นาที",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"09:58"},
      {type:"customer", text:"เครื่องสแกน 3 มิติ Shining 3D สแกนแล้วพื้นผิวไม่เนียน มีจุดขาดๆ ครับ", time:"09:58"},
    ] },
  { id:"TCK-10225", company:"บริษัท อาคิเทค พลัส จำกัด", status:"closed", breach:false, priority:"กลาง",
    team:"Ci3D", product:"Archicad", assignee:"ธีรภัทร", sales:"คุณกิตติ (เซลดูแลบัญชี)",
    channel:"LINE OA", email:"admin@archiplus.co.th", phone:"086-555-7788",
    preview:"ปิดเคส: ลง Archicad สำเร็จแล้ว", time:"เมื่อวาน", waiting:"—",
    closeSummary:"ลูกค้าติดตั้ง Archicad ไม่ผ่านเนื่องจาก antivirus บล็อกไฟล์ ให้ปิดชั่วคราวแล้วลงใหม่สำเร็จ ยืนยันใช้งานได้ปกติแล้ว",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"เมื่อวาน 14:02"},
      {type:"customer", text:"ลงโปรแกรม Archicad ไม่ผ่าน ค้างที่ 60%", time:"เมื่อวาน 14:02"},
      {type:"agent", who:"ธีรภัทร", text:"รบกวนลองปิด antivirus ชั่วคราวแล้วลงใหม่ครับ", time:"เมื่อวาน 14:10"},
      {type:"customer", text:"ลงผ่านแล้วครับ ขอบคุณมากๆ", time:"เมื่อวาน 14:30"},
      {type:"system", text:"ปิดเคส — สรุป: ลูกค้าติดตั้ง Archicad ไม่ผ่านเนื่องจาก antivirus บล็อกไฟล์ ให้ปิดชั่วคราวแล้วลงใหม่สำเร็จ", time:"เมื่อวาน 14:31"},
      {type:"system", text:"ส่งสรุปเคสให้ลูกค้าทางอีเมลและแจ้งเซลที่ดูแลบัญชีเรียบร้อยแล้ว", time:"เมื่อวาน 14:31"},
    ] },
  { id:"TCK-10218", company:"บริษัท เมทริกซ์ สตูดิโอ จำกัด", status:"cancel", breach:false, priority:"ต่ำ",
    team:"Ci2D", product:"GstarCAD", assignee:"พิมพ์ชนก", sales:"คุณอรวรรณ (เซลดูแลบัญชี)",
    channel:"เว็บไซต์", email:"account@matrixstudio.co.th", phone:"02-778-9900",
    preview:"ยกเลิกเคส: ลูกค้าแก้ปัญหาได้เองแล้ว", time:"2 วันก่อน", waiting:"—",
    cancelReason:"ลูกค้าแจ้งว่าแก้ปัญหาได้เองแล้วก่อนเจ้าหน้าที่ตอบกลับ",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"2 วันก่อน 11:00"},
      {type:"customer", text:"GstarCAD เปิดไฟล์ .dwg เก่าไม่ได้ครับ", time:"2 วันก่อน 11:00"},
      {type:"customer", text:"แก้ได้แล้วครับ ลองเปิดจากโปรแกรมใหม่กว่าได้เลย ขอบคุณครับ", time:"2 วันก่อน 11:18"},
      {type:"system", text:"ยกเลิกเคส — เหตุผล: ลูกค้าแจ้งว่าแก้ปัญหาได้เองแล้วก่อนเจ้าหน้าที่ตอบกลับ", time:"2 วันก่อน 11:20"},
    ] },
  { id:"TCK-10233", company:"บริษัท เอ็มไอเอส คอนซัลติ้ง จำกัด", status:"in_progress", breach:false, priority:"กลาง",
    team:"MIS", product:"Human Service", assignee:"ธีรภัทร", sales:"คุณกิตติ (เซลดูแลบัญชี)",
    channel:"เว็บไซต์", email:"ops@misconsult.co.th", phone:"063-222-4455",
    preview:"ขอนัดทีมเข้าไปติดตั้งและอบรมการใช้งานหน้างาน...", time:"10:20", waiting:"9 นาที",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"10:20"},
      {type:"customer", text:"อยากขอนัดทีมเข้าไปติดตั้งและอบรมการใช้งานที่ออฟฟิศครับ", time:"10:20"},
      {type:"agent", who:"ธีรภัทร", text:"รับทราบครับ ขอวันเวลาที่สะดวกเพื่อนัดทีมเข้าไปครับ", time:"10:24"},
    ] },
];

/* renamed, plain-language metric labels (abbreviation kept small, in parentheses, as a hint only) */
const MOCK_KPIS = {
  frt: { label:"เวลาตอบกลับครั้งแรก", abbr:"FRT", value:"3.2 นาที", target:"เป้าหมาย < 5 นาที", delta:"ดีขึ้น 8% จากเดือนก่อน", up:true },
  mttr: { label:"เวลาเฉลี่ยในการแก้ปัญหา", abbr:"MTTR", value:"41 นาที", target:"เป้าหมาย < 60 นาที", delta:"ดีขึ้น 3% จากเดือนก่อน", up:true },
  sla: { label:"อัตราเคสที่เกินเวลาที่กำหนด", abbr:"SLA Breach", value:"6.4%", target:"เป้าหมาย < 5%", delta:"แย่ลง 1.2% จากเดือนก่อน", up:false },
  csat: { label:"คะแนนความพึงพอใจลูกค้า", abbr:"CSAT", value:"4.6 / 5", target:"จาก 312 แบบประเมิน", delta:"ดีขึ้น 0.1 จากเดือนก่อน", up:true },
};

const MOCK_MONTHLY = [
  {m:"ก.พ.", v:62},{m:"มี.ค.", v:58},{m:"เม.ย.", v:70},{m:"พ.ค.", v:66},
  {m:"มิ.ย.", v:74},{m:"ก.ค.", v:69},{m:"ส.ค.", v:78},
];

const MOCK_TEAM_LOAD = [
  {team:"MIS (SOLIDWORKS / SolidCAM / Human Service)", open:11, breach:1},
  {team:"Ci2D (GstarCAD)", open:5, breach:0},
  {team:"Ci3D (Archicad)", open:4, breach:0},
  {team:"Ci8baht (AutoCAD)", open:9, breach:1},
  {team:"MIH (MAKERBOT / Shining 3D Scanner / 3Dconnexion)", open:6, breach:0},
];

/* status overview for the dashboard */
const MOCK_STATUS_OVERVIEW = [
  { key:"new", label:"NEW", count:8 },
  { key:"in_progress", label:"IN PROGRESS", count:14 },
  { key:"resolved", label:"RESOLVED", count:52 },
  { key:"cancel", label:"CANCEL", count:4 },
  { key:"all", label:"ALL TICKET", count:78 },
  { key:"pickup_period", label:"PICKUP PERIOD", count:6, hint:"เคสใหม่ที่ยังอยู่ในช่วงเวลาที่ต้องรับก่อนเกิน SLA" },
];

const MOCK_HOLIDAYS = [12, 13, 20]; // day numbers flagged as holiday for the demo month grid

const MOCK_AUDIT = [
  { time:"10:24:01", user:"ธีรภัทร", action:"ตอบลูกค้าบนเคส TCK-10233" },
  { time:"09:58:12", user:"ระบบ", action:"สร้างเคส TCK-10229 จาก LINE OA" },
  { time:"09:55:30", user:"ธีรภัทร", action:"เปลี่ยนสถานะ TCK-10230 เป็น รอดำเนินการ พร้อมระบุเหตุผล" },
  { time:"09:41:03", user:"ระบบ", action:"สร้างเคส TCK-10230 จากฟอร์มเว็บไซต์" },
  { time:"07:16:45", user:"ธีรภัทร", action:"เพิ่ม Internal Note บนเคส TCK-10231 และ tag ทีม License" },
  { time:"07:15:02", user:"ธีรภัทร", action:"ตอบลูกค้าบนเคส TCK-10231 (ช่องทาง LINE)" },
  { time:"เมื่อวาน 14:31:09", user:"ธีรภัทร", action:"ปิดเคส TCK-10225 พร้อมส่งสรุปให้ลูกค้าและเซลที่ดูแล" },
  { time:"2 วันก่อน 11:20:15", user:"พิมพ์ชนก", action:"ยกเลิกเคส TCK-10218 พร้อมระบุเหตุผล" },
];

/* team members for the "จัดการสมาชิก" table on the Reports page */
const MOCK_MEMBERS = [
  { name:"คุณจักกิต", role:"Admin", team:"ทั้งหมด", email:"jakkit@8baht.com" },
  { name:"คุณพิมพ์ชนก", role:"Supervisor", team:"Ci8baht", email:"pimchanok@8baht.com" },
  { name:"คุณธีรภัทร", role:"Agent", team:"Ci8baht", email:"teerapat@8baht.com" },
  { name:"คุณณัฐพล", role:"Agent", team:"MIS", email:"nattapon@8baht.com" },
  { name:"คุณสุดา", role:"Agent", team:"MIH", email:"suda@8baht.com" },
];

/* extra score given by a supervisor for cases picked up & closed on holidays */
const MOCK_HOLIDAY_BONUS = [
  { name:"คุณธีรภัทร", holidayCases:3, bonusPoints:5 },
  { name:"คุณณัฐพล", holidayCases:1, bonusPoints:2 },
  { name:"คุณสุดา", holidayCases:0, bonusPoints:0 },
];

/* per-team KPI targets, editable by Admin */
const MOCK_TEAM_TARGETS = TEAMS.map(t => ({
  team: t.code,
  label: t.label,
  frtTarget: 5,     // นาที
  mttrTarget: 60,   // นาที
  slaTarget: 5,     // %
  csatTarget: 4.5,  // จาก 5
}));
