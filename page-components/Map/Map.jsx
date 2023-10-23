import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import style from './Map.module.css';
// import { useMapPages } from '@/lib/map';

// function basicRender(point) {
//   const el = document.createElement('div');
//   // el.className = `custom_marker ${style.custom_marker}`;
//   el.innerHTML = `
//   <div class="${style.custom_marker}">
//     <div class="${style.circle_container}">
//       <div class="${style.circle_background}"></div>
//       <div class="${style.circle_stroke}"></div>
//     </div>
//     <div class="${style.rectangle}">
//       <div class="${style.arrow}"></div>
//       <div class="${style.text}">${point.content}</div>
//     </div>
//   </div>
//   `;
//   return el;
// }

function basicRender(point) {
  const el = document.createElement('div');
  // el.className = `custom_marker ${style.custom_marker}`;
  // <div class="${style.custom_marker} ${style.marker_animation}">
  el.innerHTML = `
  <div class="${style.custom_marker} ${style.marker_animation}">
    <div class="${style.rectangle}">
      <div class="${style.text}">${point.content}</div>
      <div class="${style.arrow}"></div>
    </div>
    <div class="${style.circle_container}">
      <svg class="${style.circle}" width="30" height="30" viewBox="0 0 30 30" style="--image-url: url('${point.avatar}');">
        <!-- Add a default circle with a white stroke (border) -->
        <circle cx="15" cy="15" r="15" fill="transparent" stroke="white" stroke-width="10" style="animation: dash 1s ease-in-out forwards; transform: rotate(-90deg); transform-origin: 50% 50%;" />
        <!-- The animated stroke circle on top -->
        <circle cx="15" cy="15" r="13" fill="transparent" stroke="#FF981F" stroke-width="4" style="--percent: ${point.ring.percent};" />
      </svg>
    </div>
  </div>
  `;
  return el;
}

// Create a function to handle marker click
function handleMarkerClick(lng, lat, postId) {
  console.log('Marker clicked:', lng, lat);
  window.location.href = `/post/${postId}`; //

  // You can navigate to a different page with the coordinates as parameters
  // Example using React Router's Link component
  // <Link to={`/marker/${markerIndex}?lng=${lng}&lat=${lat}`}>Marker Details</Link>
}

// function createCustomContent(content) {
//   const canvas = document.createElement('canvas');
//   canvas.width = 100; // Adjust the canvas width as needed
//   canvas.height = 100; // Adjust the canvas height as needed
//   const ctx = canvas.getContext('2d');

//   // Draw a circle in the center of the canvas
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;
//   const radius = 15; // Adjust the circle's radius as needed
//   const percentage = 75; // Percentage of the circle's circumference for the outline

//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//   ctx.fillStyle = 'blue'; // Circle color
//   ctx.fill();

//   // Draw a rounded rectangle above the circle
//   // Adjust the width and height of the rectangle as needed
//   const rectWidth = 100; // Change the width of the rectangle
//   const rectHeight = 20; // Change the height of the rectangle
//   const rectX = centerX - rectWidth / 2;
//   const rectY = centerY - radius - rectHeight - 10; // Adjust the vertical position as needed
//   const cornerRadius = 10; // Adjust the corner radius as needed

//   ctx.beginPath();
//   ctx.moveTo(rectX + cornerRadius, rectY);
//   ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
//   ctx.arcTo(
//     rectX + rectWidth,
//     rectY,
//     rectX + rectWidth,
//     rectY + cornerRadius,
//     cornerRadius
//   );
//   ctx.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius);
//   ctx.arcTo(
//     rectX + rectWidth,
//     rectY + rectHeight,
//     rectX + rectWidth - cornerRadius,
//     rectY + rectHeight,
//     cornerRadius
//   );
//   ctx.lineTo(rectX + cornerRadius, rectY + rectHeight);
//   ctx.arcTo(
//     rectX,
//     rectY + rectHeight,
//     rectX,
//     rectY + rectHeight - cornerRadius,
//     cornerRadius
//   );
//   ctx.lineTo(rectX, rectY + cornerRadius);
//   ctx.arcTo(rectX, rectY, rectX + cornerRadius, rectY, cornerRadius);
//   ctx.closePath();

//   ctx.fillStyle = '#616161'; // Rectangle fill color
//   // ctx.strokeStyle = 'blue'; // Rectangle outline color
//   // Set the rectangle outline color to transparent
//   ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
//   ctx.lineWidth = 2; // Outline width
//   ctx.fill();
//   ctx.stroke();

//   // Draw an arrow (triangle) touching below the rectangle and pointing to the circle
//   const arrowHeight = 20; // Adjust arrow height
//   const arrowSpacing = 10; // Adjust the amount of space between the arrow and circle

//   ctx.beginPath();
//   ctx.moveTo(centerX - 10, rectY + rectHeight); // Start at the left corner of the rectangle with spacing
//   ctx.lineTo(centerX + 10, rectY + rectHeight); // Move to the right corner of the rectangle with spacing
//   ctx.lineTo(centerX, rectY + rectHeight + arrowHeight - arrowSpacing); // Draw the arrow tip with spacing
//   ctx.closePath();

//   ctx.fillStyle = '#616161'; // Arrow fill color
//   ctx.fill();

//   // Define the text configuration
//   const textConfig = {
//     fontWeight: 'w400',
//     fontSize: 15.0,
//     color: 'white',
//     decoration: 'none',
//     height: 1.0,
//     letterSpacing: 0.2,
//     inherit: true,
//   };

//   // Set the font style based on the text configuration
//   const text = content; // Text to be displayed
//   ctx.font = `${textConfig.fontWeight} ${textConfig.fontSize}px Arial`;
//   ctx.fillStyle = textConfig.color;
//   ctx.textDecoration = textConfig.decoration;
//   ctx.lineHeight = textConfig.height;
//   ctx.letterSpacing = textConfig.letterSpacing;

//   // Calculate text width and center it horizontally
//   const textWidth = ctx.measureText(text).width;
//   const textX = rectX + (rectWidth - textWidth) / 2;

//   // Calculate text height and center it vertically
//   const textHeight = textConfig.fontSize;
//   const textY = rectY + (rectHeight + textHeight) / 2.5;

//   ctx.fillText(text, textX, textY); // Adjust text position for symmetry

//   // Add text inside the rectangle
//   // const text = 'Hello, World!'; // Text to be displayed
//   // ctx.fillStyle = 'black'; // Text color
//   // ctx.font = '16px Arial'; // Font and size
//   // ctx.fillText(text, rectX + 10, rectY + 30); // Adjust text position

//   // Draw the circle outline as a percentage
//   ctx.strokeStyle = '#FF981F'; // Outline color
//   ctx.lineWidth = 3; // Outline width
//   ctx.beginPath();
//   ctx.arc(
//     centerX,
//     centerY,
//     radius,
//     -Math.PI / 2,
//     -Math.PI / 2 + 2 * Math.PI * (percentage / 100)
//   );
//   ctx.stroke();

//   // Load an image and draw it inside the circle
//   const image = new Image();
//   image.src =
//     'https://hft-staging.s3.ap-southeast-1.amazonaws.com/IMAGES/POST/1910543b1091e5c1fb-123457qweryu_thumbnail_small.png'; // Replace with your image URL
//   image.onload = () => {
//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//     ctx.clip();
//     ctx.drawImage(
//       image,
//       centerX - radius,
//       centerY - radius,
//       radius * 2,
//       radius * 2
//     );
//     ctx.restore();
//   };

//   // Add a click event listener to the canvas
//   // canvas.addEventListener('click', () => {
//   //   console.log('click to marker');
//   //   handleMarkerClick(lon, lat);
//   // });

//   // Add a mouseenter event listener to change the cursor on hover
//   canvas.addEventListener('mouseenter', () => {
//     canvas.style.cursor = 'pointer'; // Change the cursor to a pointer
//   });

//   // Add a mouseleave event listener to reset the cursor when the mouse leaves the marker
//   canvas.addEventListener('mouseleave', () => {
//     canvas.style.cursor = 'auto'; // Reset the cursor to the default
//   });

//   return canvas;
// }

export default function Map() {
  // const { data } = useMapPages();
  // const posts = data;
  // console.log('postsInit', JSON.stringify(posts));
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(106.27753670110269);
  const [lat] = useState(9.630701283971433);
  const [zoom] = useState(7);
  const [API_KEY] = useState('YOUR_MAPTILER_API_KEY_HERE');
  const [markers, setMarkers] = useState([]); // State variable to manage markers

  // Define the markers array outside of the component
  // const markers = [];

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `http://14.161.5.153:8181/styles/ga-map/style.json`,
      center: [lng, lat],
      zoom: zoom,
    });
    // Define a function to update markers based on new data
    const updateMarkers = (newData) => {
      // Clear existing markers
      markers.forEach((marker) => {
        marker.remove();
      });

      // Add custom markers for points
      const points = newData?.posts?.length
        ? newData.posts.map((post) => {
            return {
              lng: post?.coordinates[0],
              lat: post?.coordinates[1],
              content: post?.content,
              _id: post?._id,
              avatar: post?.profile?.avatar
                ? post.profile.avatar
                : '/images/default_user.jpg',
              ring: {
                percent: post?.profile?.ring?.percent
                  ? post.profile.ring.percent
                  : 5,
              },
            };
          })
        : [];

      points.forEach((point) => {
        const marker = new maplibregl.Marker({
          // element: createCustomContent(point.content), // Pass content to the function,
          element: basicRender(point),
          // anchor: 'center',
        })
          .setLngLat([point.lng, point.lat])
          .addTo(map.current);

        // Add a click event listener to the marker
        marker.getElement().addEventListener('click', () => {
          marker.getElement().classList.add(style.marker_animation);
          // After a brief delay, redirect to another page
          handleMarkerClick(point.lng, point.lat, point?._id);
        });

        // Add a CSS class to change the cursor on hover
        marker.getElement().classList.add(style.marker_hover);

        markers.push(marker);
        // Update the state with the new markers
        setMarkers(markers);
      });
    };

    // Function to debounce map movement
    function debounce(func, wait) {
      let timeout;
      return function () {
        const context = this;
        const args = arguments;
        const later = function () {
          timeout = null;
          func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Define a debounced version of the updateMarkers function
    const debouncedUpdateMarkers = debounce(updateMarkers, 300); // Adjust the wait time as needed (300 milliseconds in this example)
    // Fetch initial data and create markers
    fetch('/api/map')
      .then((res) => res.json())
      .then((newData) => {
        updateMarkers(newData);
      });

    // Listen for map movement (drag) and zoom events
    map.current.on('move', () => {
      const bounds = map.current.getBounds();
      const center = map.current.getCenter();
      const zoomLevel = map.current.getZoom();

      // Log the map information to the console
      console.log('Visible Bounds:', bounds);
      console.log('Center:', center);
      console.log('Zoom Level:', zoomLevel);

      // Fetch updated data
      fetch('/api/map')
        .then((res) => res.json())
        .then((newData) => {
          // Call the updateMarkers function to update markers based on new data
          debouncedUpdateMarkers(newData);
        });
    });

    // map.current.on('zoom', () => {
    //   const bounds = map.current.getBounds();
    //   const center = map.current.getCenter();
    //   const zoomLevel = map.current.getZoom();

    //   // Log the map information to the console
    //   console.log('Visible Bounds:', bounds);
    //   console.log('Center:', center);
    //   console.log('Zoom Level:', zoomLevel);
    // });

    // Add a button to the map
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Filter Here ....';
    addButton.className = style.mapboxgl_ctrl;
    addButton.style.position = 'absolute';
    addButton.style.top = '10%'; // Center vertically
    addButton.style.left = '90%'; // Center horizontally
    addButton.style.transform = 'translate(-50%, -50%)'; // Center the button
    addButton.style.background =
      'linear-gradient(to bottom right, #FF6347, #FF69B4)'; // Gradient background
    addButton.style.color = 'white'; // Text color
    addButton.style.border = 'none';
    addButton.style.padding = '10px 20px';
    addButton.style.cursor = 'pointer';
    addButton.addEventListener('click', () => {
      // Handle the button click event
      console.log('Add Post button clicked');
    });

    mapContainer.current.appendChild(addButton);
  }, [API_KEY, lng, lat, zoom]);

  // Use a useEffect to remove markers when the component unmounts
  useEffect(() => {
    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [markers]);

  return (
    <div className={style.mapwrap}>
      <div ref={mapContainer} className={style.map} />
    </div>
  );
}
