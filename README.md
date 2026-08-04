# 8Baht Support Console — Concept Mockup

เว็บคอนเซ็ปของ "ระบบหลังบ้าน" (Backend Admin Dashboard) สำหรับทีมซัพพอร์ต 8Baht
เป็น **static HTML/CSS/JS ล้วน ไม่มี backend และไม่มีการเชื่อมต่อฐานข้อมูลจริง**
ข้อมูลทั้งหมดเป็น mock data ที่อยู่ใน `js/data.js`

## หน้าที่มีให้ทดสอบ

| หน้า | ไฟล์ | หมายเหตุ |
|---|---|---|
| Login (จำลอง) | `index.html` | เลือก Role ได้ 3 แบบ: Admin / Supervisor / Agent |
| ภาพรวม (Dashboard) | `dashboard.html` | KPI: FRT, MTTR, SLA Breach, CSAT + กราฟย้อนหลัง |
| เคส & แชท | `tickets.html` | Layout 3 กล่อง: คิว / แชท / ข้อมูลลูกค้า พร้อมสวิตช์ "ส่งลูกค้า" ↔ "Internal Note" |
| รายงาน & Analytics | `reports.html` | จำกัดเฉพาะ Admin/Supervisor |
| ตั้งค่าระบบ | `admin.html` | Business Hours Engine, ปฏิทินวันหยุด, OT Tracking, Role Management — จำกัดเฉพาะ Admin |

## วิธีทดสอบ Role ต่างๆ

หน้า Login มี dropdown ให้เลือกสิทธิ์ (Admin / Supervisor / Agent) — ระบบจะจำ role ไว้ใน `localStorage`
ของเบราว์เซอร์ (คีย์ `mock_role`) แล้วซ่อน/แสดงเมนูและข้อมูลลับ (เลขผู้เสียภาษี, มูลค่าสัญญา) ตามสิทธิ์ที่เลือก
เพื่อสาธิต **Field-level permission** ตามที่วิเคราะห์ไว้ในเอกสาร requirement

## Deploy ขึ้น GitHub Pages

1. สร้าง repo ใหม่ (หรือใช้ repo เดิม) แล้วอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้นไปที่ root ของ repo
2. เข้า **Settings → Pages**
3. เลือก Source เป็น branch `main` (หรือ branch ที่ใช้) และโฟลเดอร์ `/ (root)`
4. รอสักครู่ แล้วเปิดลิงก์ `https://<username>.github.io/<repo>/` — ระบบจะพาไปที่หน้า `index.html` (Login) โดยอัตโนมัติ

## ข้อจำกัดของ mockup นี้ (ตั้งใจ)

- ไม่มีการเชื่อมต่อ LINE OA จริง, ไม่มี backend, ไม่มีฐานข้อมูล
- ข้อมูลเคส/ลูกค้า/KPI ทั้งหมดเป็นตัวเลขสมมติสำหรับสาธิต layout และ flow เท่านั้น
- ยังไม่รวมหน้า "แจ้งเคสจากลูกค้า" (เว็บฟอร์ม + LINE OA) ตามที่ระบุว่าจะทำในภายหลัง
- เหมาะสำหรับใช้คุยกับ Developer/ทีมเพื่อ validate โครงหน้าจอและ data model ก่อนเริ่ม implement จริง
