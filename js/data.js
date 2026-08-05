/* Mock data only — no backend. Concept/demo purposes.
   All arrays here are plain JS state: edits made via the UI (add/remove product,
   add/remove member, etc.) live only in memory and reset on page reload. */

/* ---- Org structure: Team group -> Team code -> Product ---- */
let PRODUCT_CATALOG = [
  { id:"p1", group:"Software", team:"MIS",     product:"SOLIDWORKS" },
  { id:"p2", group:"Software", team:"MIS",     product:"SolidCAM" },
  { id:"p3", group:"Software", team:"Ci2D",    product:"GstarCAD" },
  { id:"p4", group:"Software", team:"Ci3D",    product:"Archicad" },
  { id:"p5", group:"Software", team:"Ci8baht", product:"AutoCAD" },
  { id:"p6", group:"Hardware", team:"MIH",     product:"MAKERBOT" },
  { id:"p7", group:"Hardware", team:"MIH",     product:"Shining 3D Scanner" },
  { id:"p8", group:"Hardware", team:"MIH",     product:"3Dconnexion" },
  { id:"p9", group:"Service",  team:"MIS",     product:"Human Service" },
];
let productSeq = 10;

const TEAMS = [
  { code:"MIS",     label:"MIS", groups:["Software","Service"] },
  { code:"Ci2D",    label:"Ci2D", groups:["Software"] },
  { code:"Ci3D",    label:"Ci3D", groups:["Software"] },
  { code:"Ci8baht", label:"Ci8baht", groups:["Software"] },
  { code:"MIH",     label:"MIH", groups:["Hardware"] },
];

/* editable per-ticket classification fields */
const SERVICE_TYPES = ["ให้คำปรึกษา", "แก้ไขปัญหาเทคนิค", "ติดตั้ง/อบรมการใช้งาน", "ต่ออายุ/สั่งซื้อสินค้า", "อื่นๆ"];
const CHANNELS = ["LINE OA", "เว็บไซต์", "โทรศัพท์", "Walk-in", "อื่นๆ"];

let ticketSeq = 10237;
function nextTicketId(){ return "TCK-" + (ticketSeq++); }

const MOCK_USERS = {
  admin:      { name:"คุณจักกิต",     role:"admin",      roleLabel:"Admin",      team:"ทั้งหมด",    initials:"JK" },
  supervisor: { name:"คุณพิมพ์ชนก",   role:"supervisor",  roleLabel:"Supervisor",  team:"Ci8baht", initials:"PC" },
  agent:      { name:"คุณธีรภัทร",    role:"agent",       roleLabel:"Agent",       team:"Ci8baht", initials:"TP" },
};

/* per-employee open workload, used on the dashboard "ภาระงานแยกตามพนักงาน" panel */
const MOCK_EMPLOYEES = [
  { name:"คุณธีรภัทร", team:"Ci8baht", open:6, breach:1 },
  { name:"คุณสมหญิง",  team:"Ci8baht", open:3, breach:0 },
  { name:"คุณพิมพ์ชนก", team:"Ci8baht", open:2, breach:0 },
  { name:"คุณณัฐพล",   team:"MIS",     open:5, breach:0 },
  { name:"คุณกานดา",   team:"MIS",     open:4, breach:1 },
  { name:"คุณปกรณ์",   team:"Ci2D",    open:5, breach:0 },
  { name:"คุณวราภรณ์", team:"Ci3D",    open:4, breach:0 },
  { name:"คุณสุดา",    team:"MIH",     open:6, breach:0 },
  { name:"คุณอนุชา",   team:"MIH",     open:3, breach:0 },
];

/* ---- Status vocabulary ----
   new          ใหม่
   in_progress  กำลังดำเนินการ
   pending      รอดำเนินการ   (requires a reason)
   cancel       ยกเลิก        (requires a reason)
   closed       ปิดเคส        (requires a summary, sent to customer + sales)
   `breach` is a separate overdue flag. `isHoliday` flags a case picked up/closed on a holiday. */

const MOCK_TICKETS = [
  { id:"TCK-10231", company:"บริษัท กรีนบิลด์ ดีไซน์ จำกัด", status:"in_progress", breach:true, isHoliday:false, priority:"สูง", serviceType:"แก้ไขปัญหาเทคนิค",
    team:"Ci8baht", product:"AutoCAD", assignee:"คุณธีรภัทร", salesEmail:"kitti.sales@8baht.com",
    channel:"LINE OA", email:"purchase@greenbuild.co.th", phone:"081-234-5678",
    preview:"AutoCAD เปิดไม่ติด ขึ้น error ตั้งแต่เช้า...", time:"07:12", date:"2026-08-04", waiting:"42 นาที",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"07:12"},
      {type:"customer", text:"AutoCAD เปิดไม่ติดครับ ขึ้น error ตั้งแต่เช้า รีบใช้งานพรีเซนต์ลูกค้า 10 โมงนี้", time:"07:12"},
      {type:"agent", who:"คุณธีรภัทร", text:"รับทราบครับ ขอ screenshot อาการ error หน่อยได้ไหมครับ", time:"07:15"},
      {type:"internal", who:"คุณธีรภัทร", text:"@ทีม License เคสนี้ลูกค้า license อาจหมดอายุ ช่วยเช็ค portal ให้หน่อยครับ", time:"07:16"},
    ] },
  { id:"TCK-10230", company:"หจก. โฟกัส เอ็นจิเนียริ่ง", status:"pending", breach:false, isHoliday:false, priority:"กลาง", serviceType:"ต่ออายุ/สั่งซื้อสินค้า",
    team:"MIS", product:"SOLIDWORKS", assignee:"คุณณัฐพล", salesEmail:"orawan.sales@8baht.com",
    channel:"เว็บไซต์", email:"it@focuseng.co.th", phone:"02-345-6789",
    preview:"สอบถามการต่ออายุ SOLIDWORKS ปีนี้...", time:"09:40", date:"2026-08-04", waiting:"18 นาที",
    pendingReason:"รอฝ่ายจัดซื้อของลูกค้ายืนยัน PO ก่อนดำเนินการต่ออายุ",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"09:40"},
      {type:"customer", text:"อยากสอบถามการต่ออายุ SOLIDWORKS ของบริษัทครับ ใกล้หมดอายุแล้ว", time:"09:41"},
      {type:"system", text:"เปลี่ยนสถานะเป็น รอดำเนินการ — เหตุผล: รอฝ่ายจัดซื้อของลูกค้ายืนยัน PO ก่อนดำเนินการต่ออายุ", time:"09:55"},
    ] },
  { id:"TCK-10229", company:"บริษัท ทรีดี วิสัวไลซ์ จำกัด", status:"new", breach:false, isHoliday:false, priority:"ต่ำ", serviceType:"แก้ไขปัญหาเทคนิค",
    team:"MIH", product:"Shining 3D Scanner", assignee:"ยังไม่มอบหมาย", salesEmail:"napat.sales@8baht.com",
    channel:"LINE OA", email:"studio@3dvisualize.co.th", phone:"089-111-2233",
    preview:"เครื่องสแกน 3 มิติ สแกนแล้วพื้นผิวไม่เนียน...", time:"09:58", date:"2026-08-04", waiting:"2 นาที",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"09:58"},
      {type:"customer", text:"เครื่องสแกน 3 มิติ Shining 3D สแกนแล้วพื้นผิวไม่เนียน มีจุดขาดๆ ครับ", time:"09:58"},
    ] },
  { id:"TCK-10225", company:"บริษัท อาคิเทค พลัส จำกัด", status:"closed", breach:false, isHoliday:true, priority:"กลาง", serviceType:"แก้ไขปัญหาเทคนิค",
    team:"Ci3D", product:"Archicad", assignee:"คุณวราภรณ์", salesEmail:"kitti.sales@8baht.com",
    channel:"LINE OA", email:"admin@archiplus.co.th", phone:"086-555-7788",
    preview:"ปิดเคส: ลง Archicad สำเร็จแล้ว", time:"เมื่อวาน", date:"2026-08-03", waiting:"—",
    closeSummary:"ลูกค้าติดตั้ง Archicad ไม่ผ่านเนื่องจาก antivirus บล็อกไฟล์ ให้ปิดชั่วคราวแล้วลงใหม่สำเร็จ ยืนยันใช้งานได้ปกติแล้ว",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"เมื่อวาน 14:02"},
      {type:"customer", text:"ลงโปรแกรม Archicad ไม่ผ่าน ค้างที่ 60%", time:"เมื่อวาน 14:02"},
      {type:"agent", who:"คุณวราภรณ์", text:"รบกวนลองปิด antivirus ชั่วคราวแล้วลงใหม่ครับ", time:"เมื่อวาน 14:10"},
      {type:"customer", text:"ลงผ่านแล้วครับ ขอบคุณมากๆ", time:"เมื่อวาน 14:30"},
      {type:"system", text:"ปิดเคส — สรุป: ลูกค้าติดตั้ง Archicad ไม่ผ่านเนื่องจาก antivirus บล็อกไฟล์ ให้ปิดชั่วคราวแล้วลงใหม่สำเร็จ", time:"เมื่อวาน 14:31"},
      {type:"system", text:"ส่งสรุปเคสให้ลูกค้าทางอีเมลและแจ้งเซลที่ดูแลบัญชีเรียบร้อยแล้ว (เคสนี้รับ/ปิดในวันหยุด)", time:"เมื่อวาน 14:31"},
    ] },
  { id:"TCK-10218", company:"บริษัท เมทริกซ์ สตูดิโอ จำกัด", status:"cancel", breach:false, isHoliday:false, priority:"ต่ำ", serviceType:"แก้ไขปัญหาเทคนิค",
    team:"Ci2D", product:"GstarCAD", assignee:"คุณปกรณ์", salesEmail:"orawan.sales@8baht.com",
    channel:"เว็บไซต์", email:"account@matrixstudio.co.th", phone:"02-778-9900",
    preview:"ยกเลิกเคส: ลูกค้าแก้ปัญหาได้เองแล้ว", time:"2 วันก่อน", date:"2026-08-02", waiting:"—",
    cancelReason:"ลูกค้าแจ้งว่าแก้ปัญหาได้เองแล้วก่อนเจ้าหน้าที่ตอบกลับ",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"2 วันก่อน 11:00"},
      {type:"customer", text:"GstarCAD เปิดไฟล์ .dwg เก่าไม่ได้ครับ", time:"2 วันก่อน 11:00"},
      {type:"customer", text:"แก้ได้แล้วครับ ลองเปิดจากโปรแกรมใหม่กว่าได้เลย ขอบคุณครับ", time:"2 วันก่อน 11:18"},
      {type:"system", text:"ยกเลิกเคส — เหตุผล: ลูกค้าแจ้งว่าแก้ปัญหาได้เองแล้วก่อนเจ้าหน้าที่ตอบกลับ", time:"2 วันก่อน 11:20"},
    ] },
  { id:"TCK-10233", company:"บริษัท เอ็มไอเอส คอนซัลติ้ง จำกัด", status:"in_progress", breach:false, isHoliday:true, priority:"กลาง", serviceType:"ติดตั้ง/อบรมการใช้งาน",
    team:"MIS", product:"Human Service", assignee:"คุณกานดา", salesEmail:"kitti.sales@8baht.com",
    channel:"เว็บไซต์", email:"ops@misconsult.co.th", phone:"063-222-4455",
    preview:"ขอนัดทีมเข้าไปติดตั้งและอบรมการใช้งานหน้างาน...", time:"10:20", date:"2026-08-04", waiting:"9 นาที",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"10:20"},
      {type:"customer", text:"อยากขอนัดทีมเข้าไปติดตั้งและอบรมการใช้งานที่ออฟฟิศครับ", time:"10:20"},
      {type:"agent", who:"คุณกานดา", text:"รับทราบครับ ขอวันเวลาที่สะดวกเพื่อนัดทีมเข้าไปครับ (รับเคสนี้ระหว่างเวรวันหยุด)", time:"10:24"},
    ] },
  { id:"TCK-10236", company:"บริษัท ไฮเทค แมนูแฟคเจอริ่ง จำกัด", status:"closed", breach:false, isHoliday:true, priority:"สูง", serviceType:"แก้ไขปัญหาเทคนิค",
    team:"MIH", product:"MAKERBOT", assignee:"คุณสุดา", salesEmail:"napat.sales@8baht.com",
    channel:"LINE OA", email:"support@hitechmfg.co.th", phone:"082-909-1122",
    preview:"ปิดเคส: เปลี่ยนหัวพิมพ์ MAKERBOT ให้แล้ว", time:"5 วันก่อน", date:"2026-07-30", waiting:"—",
    closeSummary:"หัวพิมพ์อุดตัน เปลี่ยนหัวพิมพ์สำรองให้ลูกค้าและสอนวิธีทำความสะอาดป้องกันการอุดตันซ้ำ",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"5 วันก่อน 09:10"},
      {type:"customer", text:"เครื่องพิมพ์ MAKERBOT พิมพ์ไม่ออก คาดว่าหัวพิมพ์อุดตันครับ", time:"5 วันก่อน 09:10"},
      {type:"agent", who:"คุณสุดา", text:"รับเคสนี้ครับ (เวรวันหยุด) จะเข้าไปเปลี่ยนหัวพิมพ์สำรองให้ครับ", time:"5 วันก่อน 10:00"},
      {type:"system", text:"ปิดเคส — สรุป: หัวพิมพ์อุดตัน เปลี่ยนหัวพิมพ์สำรองให้ลูกค้าและสอนวิธีทำความสะอาดป้องกันการอุดตันซ้ำ", time:"5 วันก่อน 13:40"},
    ] },
];

/* renamed, plain-language metric labels (abbreviation kept small, in parentheses, as a hint only)
   CSAT is on a 0–10 scale. */
const MOCK_KPIS = {
  frt: { label:"เวลาตอบกลับครั้งแรก", abbr:"FRT", value:"3.2 นาที", target:"เป้าหมาย < 5 นาที", delta:"ดีขึ้น 8% จากเดือนก่อน", up:true },
  mttr: { label:"เวลาเฉลี่ยในการแก้ปัญหา", abbr:"MTTR", value:"41 นาที", target:"เป้าหมาย < 60 นาที", delta:"ดีขึ้น 3% จากเดือนก่อน", up:true },
  sla: { label:"อัตราเคสที่เกินเวลาที่กำหนด", abbr:"SLA Breach", value:"6.4%", target:"เป้าหมาย < 5%", delta:"แย่ลง 1.2% จากเดือนก่อน", up:false },
  csat: { label:"คะแนนความพึงพอใจลูกค้า", abbr:"CSAT", value:"9.2 / 10", target:"จาก 312 แบบประเมิน", delta:"ดีขึ้น 0.2 จากเดือนก่อน", up:true },
};

/* year-over-year trend, selectable by metric — used by the monthly comparison chart
   on both the Dashboard and Reports pages */
const MOCK_TREND = {
  "จำนวนเคส": [
    {m:"ก.พ.", thisYear:62, lastYear:51},
    {m:"มี.ค.", thisYear:58, lastYear:54},
    {m:"เม.ย.", thisYear:70, lastYear:60},
    {m:"พ.ค.", thisYear:66, lastYear:59},
    {m:"มิ.ย.", thisYear:74, lastYear:63},
    {m:"ก.ค.", thisYear:69, lastYear:65},
    {m:"ส.ค.", thisYear:78, lastYear:68},
  ],
  "เวลาตอบกลับครั้งแรก (นาที)": [
    {m:"ก.พ.", thisYear:4.1, lastYear:5.0},
    {m:"มี.ค.", thisYear:3.8, lastYear:4.8},
    {m:"เม.ย.", thisYear:3.5, lastYear:4.6},
    {m:"พ.ค.", thisYear:3.6, lastYear:4.5},
    {m:"มิ.ย.", thisYear:3.3, lastYear:4.3},
    {m:"ก.ค.", thisYear:3.4, lastYear:4.4},
    {m:"ส.ค.", thisYear:3.2, lastYear:4.2},
  ],
  "เวลาเฉลี่ยแก้ปัญหา (นาที)": [
    {m:"ก.พ.", thisYear:50, lastYear:65},
    {m:"มี.ค.", thisYear:48, lastYear:63},
    {m:"เม.ย.", thisYear:46, lastYear:61},
    {m:"พ.ค.", thisYear:45, lastYear:60},
    {m:"มิ.ย.", thisYear:43, lastYear:58},
    {m:"ก.ค.", thisYear:42, lastYear:57},
    {m:"ส.ค.", thisYear:41, lastYear:55},
  ],
  "อัตราเกิน SLA (%)": [
    {m:"ก.พ.", thisYear:8.5, lastYear:10.0},
    {m:"มี.ค.", thisYear:8.0, lastYear:9.6},
    {m:"เม.ย.", thisYear:7.5, lastYear:9.4},
    {m:"พ.ค.", thisYear:7.0, lastYear:9.0},
    {m:"มิ.ย.", thisYear:6.8, lastYear:8.8},
    {m:"ก.ค.", thisYear:6.6, lastYear:8.5},
    {m:"ส.ค.", thisYear:6.4, lastYear:8.2},
  ],
  "คะแนนความพึงพอใจ (เต็ม 10)": [
    {m:"ก.พ.", thisYear:8.8, lastYear:8.2},
    {m:"มี.ค.", thisYear:8.9, lastYear:8.3},
    {m:"เม.ย.", thisYear:9.0, lastYear:8.3},
    {m:"พ.ค.", thisYear:9.0, lastYear:8.4},
    {m:"มิ.ย.", thisYear:9.1, lastYear:8.4},
    {m:"ก.ค.", thisYear:9.1, lastYear:8.5},
    {m:"ส.ค.", thisYear:9.2, lastYear:8.5},
  ],
};

/* status overview for the dashboard */
const MOCK_STATUS_OVERVIEW = [
  { key:"new", label:"NEW", count:8 },
  { key:"in_progress", label:"IN PROGRESS", count:14 },
  { key:"resolved", label:"RESOLVED", count:52 },
  { key:"cancel", label:"CANCEL", count:4 },
  { key:"pickup_period", label:"PICKUP PERIOD", count:6, hint:"เคสใหม่ที่ยังอยู่ในช่วงเวลาที่ต้องรับก่อนเกิน SLA" },
  { key:"all", label:"ALL TICKET", count:78, hint:"ผลรวมทุกสถานะ" },
];

/* holidays keyed by "YYYY-MM", used by the holiday calendar (month selectable) */
const MOCK_HOLIDAYS_BY_MONTH = {
  "2026-07": [1, 20, 28],
  "2026-08": [12, 13, 20],
  "2026-09": [1, 13],
  "2026-10": [13, 23, 31],
  "2026-12": [5, 10, 31],
};

const MOCK_AUDIT = [
  { time:"10:24:01", user:"คุณธีรภัทร", action:"ตอบลูกค้าบนเคส TCK-10233" },
  { time:"09:58:12", user:"ระบบ", action:"สร้างเคส TCK-10229 จาก LINE OA" },
  { time:"09:55:30", user:"คุณธีรภัทร", action:"เปลี่ยนสถานะ TCK-10230 เป็น รอดำเนินการ พร้อมระบุเหตุผล" },
  { time:"09:41:03", user:"ระบบ", action:"สร้างเคส TCK-10230 จากฟอร์มเว็บไซต์" },
  { time:"07:16:45", user:"คุณธีรภัทร", action:"เพิ่ม Internal Note บนเคส TCK-10231 และ tag ทีม License" },
  { time:"07:15:02", user:"คุณธีรภัทร", action:"ตอบลูกค้าบนเคส TCK-10231 (ช่องทาง LINE)" },
  { time:"เมื่อวาน 14:31:09", user:"คุณวราภรณ์", action:"ปิดเคส TCK-10225 พร้อมส่งสรุปให้ลูกค้าและเซลที่ดูแล (เวรวันหยุด)" },
  { time:"2 วันก่อน 11:20:15", user:"คุณปกรณ์", action:"ยกเลิกเคส TCK-10218 พร้อมระบุเหตุผล" },
];

/* team members — the "จัดการสมาชิก" table on the Reports page can add/remove these */
let MOCK_MEMBERS = [
  { id:"m1", name:"คุณจักกิต", role:"Admin", team:"ทั้งหมด", email:"jakkit@8baht.com" },
  { id:"m2", name:"คุณพิมพ์ชนก", role:"Supervisor", team:"Ci8baht", email:"pimchanok@8baht.com" },
  { id:"m3", name:"คุณธีรภัทร", role:"Agent", team:"Ci8baht", email:"teerapat@8baht.com" },
  { id:"m4", name:"คุณณัฐพล", role:"Agent", team:"MIS", email:"nattapon@8baht.com" },
  { id:"m5", name:"คุณสุดา", role:"Agent", team:"MIH", email:"suda@8baht.com" },
];
let memberSeq = 6;

/* CSAT breakdown, switchable between grouping dimensions on the Reports page */
const MOCK_CSAT_BREAKDOWN = {
  "สินค้า": [
    { label:"MIS · SOLIDWORKS", score:9.4, reviews:42 },
    { label:"MIS · SolidCAM", score:9.0, reviews:18 },
    { label:"Ci2D · GstarCAD", score:8.8, reviews:28 },
    { label:"Ci3D · Archicad", score:9.1, reviews:19 },
    { label:"Ci8baht · AutoCAD", score:9.3, reviews:39 },
    { label:"MIH · MAKERBOT", score:8.6, reviews:15 },
    { label:"MIH · Shining 3D Scanner", score:8.9, reviews:11 },
    { label:"MIH · 3Dconnexion", score:9.5, reviews:9 },
    { label:"MIS · Human Service", score:9.6, reviews:22 },
  ],
  "ทีม": [
    { label:"MIS", score:9.3, reviews:82 },
    { label:"Ci2D", score:8.8, reviews:28 },
    { label:"Ci3D", score:9.1, reviews:19 },
    { label:"Ci8baht", score:9.3, reviews:39 },
    { label:"MIH", score:8.8, reviews:35 },
  ],
  "เจ้าหน้าที่": [
    { label:"คุณธีรภัทร", score:9.5, reviews:58 },
    { label:"คุณณัฐพล", score:9.0, reviews:34 },
    { label:"คุณกานดา", score:8.9, reviews:26 },
    { label:"คุณปกรณ์", score:8.8, reviews:28 },
    { label:"คุณวราภรณ์", score:9.1, reviews:19 },
    { label:"คุณสุดา", score:8.9, reviews:24 },
    { label:"คุณอนุชา", score:8.7, reviews:13 },
  ],
};

/* per-team KPI targets, editable by Admin. CSAT target is on a 0–10 scale. */
const MOCK_TEAM_TARGETS = TEAMS.map(t => ({
  team: t.code,
  label: t.label,
  frtTarget: 5,     // นาที
  mttrTarget: 60,   // นาที
  slaTarget: 5,     // %
  csatTarget: 8.5,  // จาก 10
}));

/* per-agent detail rows for the Reports "รายละเอียดแยกตามพนักงาน" table */
const MOCK_AGENT_DETAIL = [
  { name:"คุณธีรภัทร", team:"Ci8baht", handled:22, closed:18, frt:"2.8 นาที", csat:"9.5 / 10" },
  { name:"คุณณัฐพล",   team:"MIS",     handled:19, closed:16, frt:"3.4 นาที", csat:"9.0 / 10" },
  { name:"คุณกานดา",   team:"MIS",     handled:15, closed:13, frt:"3.9 นาที", csat:"8.9 / 10" },
  { name:"คุณปกรณ์",   team:"Ci2D",    handled:17, closed:14, frt:"3.1 นาที", csat:"8.8 / 10" },
  { name:"คุณวราภรณ์", team:"Ci3D",    handled:14, closed:12, frt:"3.6 นาที", csat:"9.1 / 10" },
  { name:"คุณสุดา",    team:"MIH",     handled:16, closed:14, frt:"4.0 นาที", csat:"8.9 / 10" },
  { name:"คุณอนุชา",   team:"MIH",     handled:10, closed:9,  frt:"4.4 นาที", csat:"8.7 / 10" },
];
