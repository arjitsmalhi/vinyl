/**
 * Utility to extract dominant color from an image URL using an in-memory Canvas
 */

export async function extractDominantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    // If it's a cross-origin image that fails, fallback gracefully
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    const timeout = setTimeout(() => {
      resolve('#C8A25A'); // Fallback brass
    }, 1500);

    img.onload = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('#C8A25A');
          return;
        }

        // Downscale for fast processing
        const size = 32;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imgData = ctx.getImageData(0, 0, size, size).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < imgData.length; i += 4) {
          const red = imgData[i];
          const green = imgData[i + 1];
          const blue = imgData[i + 2];
          const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

          // Exclude extreme darks and extreme whites to preserve rich hue
          if (brightness > 35 && brightness < 225) {
            r += red;
            g += green;
            b += blue;
            count++;
          }
        }

        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);

          // Boost saturation slightly for vibrant vinyl label accent
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          resolve(hex);
        } else {
          resolve('#C8A25A');
        }
      } catch (e) {
        resolve('#C8A25A');
      }
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve('#C8A25A');
    };
  });
}
