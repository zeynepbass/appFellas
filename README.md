# Flight Booking App

## Proje Hakkında
Bu proje, kullanıcıların uçuşları arayıp rezervasyon yapabilmelerine olanak tanıyan bir uçuş rezervasyon uygulamasıdır. Kullanıcılar, kayıt olduktan sonra özel kuponlar alır ve uygulama üzerinden uçuşları filtreleyerek kolayca rezervasyon yapabilirler.

## Özellikler
- **Kullanıcı Kaydı ve Girişi:** 
  - Kullanıcılar, kayıt olmadan rezervasyon yapamazlar.
  - Kayıtlı kullanıcılar için özel kupon tanımlamaları yapılır.

- **Uçuş API Entegrasyonu:**
  - Uçuş, hava yolları ve destinasyon detayları için API'ler kullanılmıştır.
  - Kalkış noktası olarak Amsterdam ve diğer şehirlere uçuşlar filtrelenebilir.

- **Tarih Filtreleme:**
  - Bugünün tarihinden önceki uçuşlar için "Book Flight" butonu devre dışı bırakılır.

- **Bilet Detayları:** 
  - Kullanıcılar, bilet detaylarını görebilir ve sepete atabilirler.
  - Sepete atma işlemi için `localStorage` kullanılarak otomatik olarak ad, soyad ve e-posta bilgileri alınır.

- **Toastify ile Bildirimler:**
  - Kullanıcı etkileşimleri için uyarı mesajları yayınlamak amacıyla Toastify kullanılmıştır.

- **Responsive Tasarım:**
  - Uygulama, farklı cihazlarda düzgün görüntülenecek şekilde responsive olarak tasarlanmıştır.

## Teknolojiler
- **Frontend:** React ContextApi CSS3 BOOTSTRAP4
- **Backend:** Node.js
- **Veritabanı:** MongoDB

## Kurulum
1.npm install-npm start ile client klasorunu calıstırabılırsınız
(register işlemini gerçekleştiriyoruz (burada nodejs mongodb kullandım) proje bıze 200 tl kupon tanımlıyor ve localstroge kaydedıyor )
<img width="1365" alt="Ekran Resmi 2024-09-23 18 54 32" src="https://github.com/user-attachments/assets/0e746755-565c-49cb-8e35-81d42ec99e97">
(login işlemini gerçekleştiriyoruz )
<img width="1437" alt="Ekran Resmi 2024-09-23 18 56 07" src="https://github.com/user-attachments/assets/18e700b1-0223-4ff7-a43c-5658324c4ae0">
(flights apisini çekiyorum country destinations apisiyle iç içe kullanarak ekrana basıyoruz)
![Ekran Resmi 2024-09-23 17 25 51 (2)](https://github.com/user-attachments/assets/6686fbf0-0050-458e-8762-787cb89baef2)
(filtreleme işlemini gerçekleştiriyoruz biniş iniş kalkış tarihi iniş tarihi burada da flights apisini kullandım ve tarihi bugunun tarihinden kucuk olan binişleri sepete ekleme butonunu disabled yaptım)
![Ekran Resmi 2024-09-23 17 27 25 (2)](https://github.com/user-attachments/assets/75a82359-ff2a-415a-86de-71c3a8970369)
(check the details ile detay modal yaptım burada airlines apisi flights apisini kullandım iataCode ile havaalanına ulastım)
![Ekran Resmi 2024-09-23 17 28 27 (2)](https://github.com/user-attachments/assets/d9288ea2-864e-4c57-b8af-f942f9b23b98)
(sepete ekleme işlemi kayıtlı olduğu için localstroge dinamik olarak ad soyad email getirtdim ve 200 tl kuponu dustum ve verıtabanıma kaydettım ucuslarım sayfasına yonlendırdım)
![Ekran Resmi 2024-09-23 17 31 41 (2)](https://github.com/user-attachments/assets/b9042f3c-23e7-48a4-9d0a-e051c51b8338)
(ucuslarım sayfasında bır get ıslemı yaptım)
![Ekran Resmi 2024-09-23 17 32 40 (2)](https://github.com/user-attachments/assets/0573c2dd-7887-49d9-bb51-70c5fced2a42)
(ucuslarım sayfasını detay alanı ıle bıtırdım. Toggle ıslemıyle detayları sergıledım)
![7](https://github.com/user-attachments/assets/bfbb8f06-7626-4091-ad9b-26e0e3ea2fa0)

(eğer üye değilse kupon sağlıcagımıza daır onu bılgılendırdım)
![Ekran Resmi 2024-09-23 17 34 24 (2)](https://github.com/user-attachments/assets/b1ea7b34-4563-4ac6-8ca5-0c3d69c9e11f)
(sepet işleminde manuel olarak bılgılerını yazdırdım kupon olarakta düşmedım emaılıne gonderdım oradan takıbını yapabılır ucuslarıma yonlendırmeyıp register sayfasına yonlendırdım)
![Ekran Resmi 2024-09-23 17 36 20 (2)](https://github.com/user-attachments/assets/1a4c80a1-4dbe-44bc-b1f8-ead551bf03b7)





