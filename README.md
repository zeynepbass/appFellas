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
- **Frontend:** React
- **Backend:** Node.js
- **Veritabanı:** MongoDB

## Kurulum
1.npm install-npm start ile client klasorunu calıstırabılırsınız
![1](https://github.com/user-attachments/assets/c165eaf6-df98-4b22-989b-52b777be5324)

