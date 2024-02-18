export async function loadLocationPage() {
  const mapContainer = document.querySelector(".map-container");
  var mapElement = await document.createElement("iframe");
  mapElement.src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2030.206732504136!2d5.267201213556618!3d59.41294637454918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463b9f999b4cd33b%3A0xedffb191211e82a8!2sLykke%20og%20Liten%20Systue!5e0!3m2!1sen!2sno!4v1707060335031!5m2!1sen!2sno";
  mapElement.width = "100%";
  mapElement.height = "300";
  mapElement.style.border = "0";
  mapElement.allowfullscreen = "";
  mapElement.loading = "lazy";
  mapElement.referrerpolicy = "no-referrer-when-downgrade";

  mapContainer.appendChild(mapElement);
}
