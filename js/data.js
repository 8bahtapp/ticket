/* Mock data only — no backend. Concept/demo purposes. */

const MOCK_USERS = {
  admin:      { name:"คุณจักกิต",     role:"admin",      roleLabel:"Admin",      team:"ทั้งหมด",    initials:"JK" },
  supervisor: { name:"คุณพิมพ์ชนก",   role:"supervisor",  roleLabel:"Supervisor",  team:"ทีม Adobe/CAD", initials:"PC" },
  agent:      { name:"คุณธีรภัทร",    role:"agent",       roleLabel:"Agent",       team:"ทีม Adobe/CAD", initials:"TP" },
};

const MOCK_TICKETS = [
  { id:"TCK-10231", company:"บริษัท กรีนบิลด์ ดีไซน์ จำกัด", status:"breach",  priority:"สูง",   team:"Adobe/CAD", assignee:"ธีรภัทร", channel:"LINE OA", preview:"SketchUp เปิดไม่ติด ขึ้น error ตั้งแต่เช้า...", time:"07:12", waiting:"42 นาที",
    licenses:["SketchUp Studio 2026","V-Ray for SketchUp"], taxId:"0105564xxxxxx", contractValue:"เห็นเฉพาะ Supervisor ขึ้นไป",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"07:12"},
      {type:"customer", text:"SketchUp เปิดไม่ติดครับ ขึ้น error ตั้งแต่เช้า รีบใช้งานพรีเซนต์ลูกค้า 10 โมงนี้", time:"07:12"},
      {type:"agent", who:"ธีรภัทร", text:"รับทราบครับ ขอ screenshot อาการ error หน่อยได้ไหมครับ", time:"07:15"},
      {type:"internal", who:"ธีรภัทร", text:"@ทีม License เคสนี้ลูกค้า Studio license อาจหมดอายุ ช่วยเช็ค portal ให้หน่อยครับ", time:"07:16"},
    ] },
  { id:"TCK-10230", company:"หจก. โฟกัส เอ็นจิเนียริ่ง", status:"pending", priority:"กลาง", team:"Autodesk",  assignee:"ธีรภัทร", channel:"เว็บไซต์", preview:"สอบถามการต่ออายุ AutoCAD LT ปีนี้...", time:"09:40", waiting:"18 นาที",
    licenses:["AutoCAD LT 2025"], taxId:"0105561xxxxxx", contractValue:"เห็นเฉพาะ Supervisor ขึ้นไป",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"09:40"},
      {type:"customer", text:"อยากสอบถามการต่ออายุ AutoCAD LT ของบริษัทครับ ใกล้หมดอายุแล้ว", time:"09:41"},
    ] },
  { id:"TCK-10229", company:"บริษัท ทรีดี วิสัวไลซ์ จำกัด", status:"new", priority:"ต่ำ", team:"Rendering", assignee:"ยังไม่มอบหมาย", channel:"LINE OA", preview:"ถามความแตกต่างของ D5 กับ Enscape...", time:"09:58", waiting:"2 นาที",
    licenses:["D5 Render", "Enscape"], taxId:"0105562xxxxxx", contractValue:"เห็นเฉพาะ Supervisor ขึ้นไป",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"09:58"},
      {type:"customer", text:"พอดีบริษัทใช้ทั้ง D5 กับ Enscape อยู่ อยากรู้ว่าต่างกันยังไงเวลา render ครับ", time:"09:58"},
    ] },
  { id:"TCK-10225", company:"บริษัท อาคิเทค พลัส จำกัด", status:"resolved", priority:"กลาง", team:"Adobe/CAD", assignee:"ธีรภัทร", channel:"LINE OA", preview:"ปิดเคส: ลง Adobe CC สำเร็จแล้ว", time:"เมื่อวาน", waiting:"—",
    licenses:["Adobe Creative Cloud"], taxId:"0105560xxxxxx", contractValue:"เห็นเฉพาะ Supervisor ขึ้นไป",
    log:[
      {type:"system", text:"เคสถูกสร้างจาก LINE OA อัตโนมัติ", time:"เมื่อวาน 14:02"},
      {type:"customer", text:"ลงโปรแกรม Adobe ไม่ผ่าน ค้างที่ 60%", time:"เมื่อวาน 14:02"},
      {type:"agent", who:"ธีรภัทร", text:"รบกวนลองปิด antivirus ชั่วคราวแล้วลงใหม่ครับ", time:"เมื่อวาน 14:10"},
      {type:"customer", text:"ลงผ่านแล้วครับ ขอบคุณมากๆ", time:"เมื่อวาน 14:30"},
      {type:"system", text:"เจ้าหน้าที่ปิดเคส — สถานะ: Resolved", time:"เมื่อวาน 14:31"},
    ] },
  { id:"TCK-10218", company:"บริษัท เมทริกซ์ สตูดิโอ จำกัด", status:"closed", priority:"ต่ำ", team:"BIM Bundle", assignee:"พิมพ์ชนก", channel:"เว็บไซต์", preview:"ปิดเคส: ยืนยันจำนวน seat แล้ว", time:"2 วันก่อน", waiting:"—",
    licenses:["BIM Bundle"], taxId:"0105559xxxxxx", contractValue:"เห็นเฉพาะ Supervisor ขึ้นไป",
    log:[
      {type:"system", text:"เคสถูกสร้างจากฟอร์มเว็บไซต์", time:"2 วันก่อน 11:00"},
      {type:"customer", text:"อยากทราบว่า license ปัจจุบันใช้ได้กี่ seat ครับ", time:"2 วันก่อน 11:00"},
      {type:"agent", who:"พิมพ์ชนก", text:"ตามสัญญาปัจจุบัน 5 seat ครับ", time:"2 วันก่อน 11:20"},
      {type:"system", text:"เจ้าหน้าที่ปิดเคส — สถานะ: Closed", time:"2 วันก่อน 11:25"},
    ] },
];

const MOCK_KPIS = {
  frt: { value:"3.2 นาที", target:"เป้าหมาย < 5 นาที", delta:"-8% จากเดือนก่อน", up:true },
  mttr: { value:"41 นาที", target:"เป้าหมาย < 60 นาที", delta:"-3% จากเดือนก่อน", up:true },
  sla: { value:"6.4%", target:"เป้าหมาย < 5%", delta:"+1.2% จากเดือนก่อน", up:false },
  csat: { value:"4.6 / 5", target:"จาก 312 แบบประเมิน", delta:"+0.1 จากเดือนก่อน", up:true },
};

const MOCK_MONTHLY = [
  {m:"ก.พ.", v:62},{m:"มี.ค.", v:58},{m:"เม.ย.", v:70},{m:"พ.ค.", v:66},
  {m:"มิ.ย.", v:74},{m:"ก.ค.", v:69},{m:"ส.ค.", v:78},
];

const MOCK_TEAM_LOAD = [
  {team:"Adobe/CAD", open:14, breach:2},
  {team:"Autodesk", open:9, breach:0},
  {team:"Rendering (D5/Enscape/V-Ray)", open:6, breach:1},
  {team:"BIM Bundle", open:4, breach:0},
  {team:"Microsoft 365", open:7, breach:0},
];

const MOCK_HOLIDAYS = [12, 13, 20]; // day numbers flagged as holiday for the demo month grid

const MOCK_AUDIT = [
  { time:"09:58:12", user:"ระบบ", action:"สร้างเคส TCK-10229 จาก LINE OA" },
  { time:"09:41:03", user:"ระบบ", action:"สร้างเคส TCK-10230 จากฟอร์มเว็บไซต์" },
  { time:"07:16:45", user:"ธีรภัทร", action:"เพิ่ม Internal Note บนเคส TCK-10231 และ tag ทีม License" },
  { time:"07:15:02", user:"ธีรภัทร", action:"ตอบลูกค้าบนเคส TCK-10231 (ช่องทาง LINE)" },
  { time:"เมื่อวาน 14:31:09", user:"ธีรภัทร", action:"เปลี่ยนสถานะ TCK-10225 จาก Pending → Resolved" },
  { time:"2 วันก่อน 11:25:40", user:"พิมพ์ชนก", action:"เปลี่ยนสถานะ TCK-10218 จาก Resolved → Closed" },
];
