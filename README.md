# 8Baht Support Console — Concept Mockup

เว็บคอนเซ็ปของ "ระบบหลังบ้าน" (Backend Admin Dashboard) สำหรับทีมซัพพอร์ต 8Baht
เป็น **static HTML/CSS/JS ล้วน ไม่มี backend และไม่มีการเชื่อมต่อฐานข้อมูลจริง**
ข้อมูลทั้งหมดเป็น mock data ที่อยู่ใน `js/data.js`

## หน้าที่มีให้ทดสอบ

| หน้า | ไฟล์ | หมายเหตุ |
|---|---|---|
| Login (จำลอง) | `index.html` | เลือก Role ได้ 3 แบบ: Admin / Supervisor / Agent |
| ภาพรวม (Dashboard) | `dashboard.html` | สถานะเคสทั้งหมด (NEW, IN PROGRESS, RESOLVED, CANCEL, ALL TICKET, PICKUP PERIOD) + KPI แบบเข้าใจง่าย + กราฟย้อนหลัง |
| เคส & แชท | `tickets.html` | Layout 3 กล่อง: คิว / แชท / ข้อมูลลูกค้า พร้อมสวิตช์ "ส่งลูกค้า" ↔ "Internal Note", ค้นหาได้จากบริษัท/อีเมล/เบอร์/note, สถานะเคสมีป๊อปอัพให้ระบุเหตุผล/สรุป |
| รายงาน & Analytics | `reports.html` | จำกัดเฉพาะ Admin/Supervisor — มีจัดการสมาชิก (แก้อีเมลได้) และให้คะแนนพิเศษเคสวันหยุด |
| ตั้งค่าระบบ | `admin.html` | Business Hours Engine, ปฏิทินวันหยุด, ตั้งเป้าหมาย KPI แยกตามทีม, Role Management — จำกัดเฉพาะ Admin |

## วิธีทดสอบ Role ต่างๆ

หน้า Login มี dropdown ให้เลือกสิทธิ์ (Admin / Supervisor / Agent) — ระบบจะจำ role ไว้ใน `localStorage`
ของเบราว์เซอร์ (คีย์ `mock_role`) แล้วซ่อน/แสดงเมนูตามสิทธิ์ที่เลือก (เช่น Agent จะไม่เห็นเมนูรายงานและตั้งค่าระบบ)

## สถานะเคส

ใหม่ → กำลังดำเนินการ → รอดำเนินการ (ต้องระบุเหตุผล) / ยกเลิก (ต้องระบุเหตุผล) / ปิดเคส (ต้องระบุสรุป ซึ่งจะถูกส่งให้ลูกค้าและเซลที่ดูแลบัญชีตามที่ระบุในหน้า Ticket)
การเปลี่ยนสถานะทั้ง 3 แบบหลังนี้จะมีป๊อปอัพให้กรอกข้อมูลก่อนยืนยันเสมอ

## โครงสร้างทีม/สินค้า (ใช้ในข้อมูลจำลองทั้งหมด)

- **Team Software:** MIS (SOLIDWORKS, SolidCAM) · Ci2D (GstarCAD) · Ci3D (Archicad) · Ci8baht (AutoCAD)
- **Team Hardware:** MIH (MAKERBOT, Shining 3D Scanner, 3Dconnexion)
- **Team Service:** MIS (Human Service)

## Deploy ขึ้น GitHub Pages

1. สร้าง repo ใหม่ (หรือใช้ repo เดิม) แล้วอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้นไปที่ root ของ repo
2. เข้า **Settings → Pages**
3. เลือก Source เป็น branch `main` (หรือ branch ที่ใช้) และโฟลเดอร์ `/ (root)`
4. รอสักครู่ แล้วเปิดลิงก์ `https://<username>.github.io/<repo>/` — ระบบจะพาไปที่หน้า `index.html` (Login) โดยอัตโนมัติ

## ข้อจำกัดของ mockup นี้ (ตั้งใจ)

- ไม่มีการเชื่อมต่อ LINE OA จริง, ไม่มี backend, ไม่มีฐานข้อมูล
- ข้อมูลเคส/ลูกค้า/KPI ทั้งหมดเป็นตัวเลขสมมติสำหรับสาธิต layout และ flow เท่านั้น
- ไม่มีข้อมูลด้านราคา/มูลค่าสัญญา/เลขผู้เสียภาษีในเวอร์ชันนี้ตามที่ระบุ
- ปุ่ม "บันทึก" ต่างๆ (แก้อีเมลสมาชิก, ให้คะแนนพิเศษ, ตั้งเป้าหมาย KPI) เป็นการจำลองผลลัพธ์ในหน้าเว็บเท่านั้น ยังไม่มีการบันทึกจริง
- ยังไม่รวมหน้า "แจ้งเคสจากลูกค้า" (เว็บฟอร์ม + LINE OA) ตามที่ระบุว่าจะทำในภายหลัง
- เหมาะสำหรับใช้คุยกับ Developer/ทีมเพื่อ validate โครงหน้าจอและ data model ก่อนเริ่ม implement จริง
