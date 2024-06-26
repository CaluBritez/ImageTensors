document.getElementById('imageUpload').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const imgElement = document.getElementById('originalImage');
        imgElement.src = event.target.result;

        imgElement.onload = async function () {

            const tensor = tf.browser.fromPixels(imgElement);


            const resizedBilinear = tf.image.resizeBilinear(tensor, [100, 100]);
            const resizedBilinearNormalized = resizedBilinear.div(tf.scalar(255)); // Normalizar los valores de píxeles
            await tf.browser.toPixels(resizedBilinearNormalized, document.getElementById('resizedImageBilinear'));


            const resizedNearestNeighbor = tf.image.resizeNearestNeighbor(tensor, [100, 100]);
            await tf.browser.toPixels(resizedNearestNeighbor, document.getElementById('resizedImageNearestNeighbor'));


            const mirrored = tensor.reverse(1);
            tf.browser.toPixels(mirrored, document.getElementById('mirroredImage'));


            tensor.dispose();
            resizedBilinear.dispose();
            resizedNearestNeighbor.dispose();
            mirrored.dispose();
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});