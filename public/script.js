$(document).ready(function() {
    console.log("Document is ready");
    const canvas = $('#pendantCanvas')[0];
    if (!canvas) {
        console.log("Canvas element not found");
        return;
    }
    const ctx = canvas.getContext('2d');
    console.log("Canvas context:", ctx);

    const baseImage = new Image();
    baseImage.src = '/images/Cartouche.png';
    baseImage.onload = function() {
        console.log("Drawing base image");
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    };
    baseImage.onerror = function() {
        console.log("Error loading base image");
    };

    $('.grid-item img').click(function() {
        console.log("Grid image clicked");
        const symbolImage = new Image();
        symbolImage.src = $(this).attr('src');
        console.log("Attempting to load symbol image:", symbolImage.src);

        symbolImage.onload = function() {
            console.log("Symbol image loaded, drawing on canvas");

            console.log("Before yOffset assignment");
            let yOffset = $('canvas').data('count') || 0;
            console.log("After yOffset assignment", yOffset);

            const imgHeight = 100; // Make sure this matches your intended size
            console.log("imgHeight value:", imgHeight);

            yOffset *= imgHeight;
            console.log("Calculated yOffset:", yOffset);

            if (yOffset + imgHeight <= canvas.height) {
                console.log("Before drawing image on canvas");
                ctx.drawImage(symbolImage, 0, yOffset, canvas.width, imgHeight);
                console.log("After drawing image on canvas");

                const newCount = (yOffset / imgHeight) + 1;
                $('canvas').data('count', newCount);
                console.log("Updated count:", newCount);
            } else {
                console.log("No more space on the pendant");
            }
        };

        symbolImage.onerror = function() {
            console.log("Error loading symbol image", this.src);
        };


        $(document).ready(function() {
        
            // Keydown event for changing canvas height and clearing images
            $(document).keydown(function(e) {
                switch(e.key) {
                    case 's':
                        $('#pendantCanvas').height(300);
                        break;
                    case 'm':
                        $('#pendantCanvas').height(600);
                        break;
                    case 'l':
                        $('#pendantCanvas').height(900);
                        break;
                    case 'x':
                        $('#pendantCanvas').height(1200);
                        break;
                    case 'd':
                        // Clear the canvas
                        const canvas = $('#pendantCanvas')[0];
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // Optionally redraw the base image or reset the count
                        $('canvas').data('count', 0);  // Resetting the symbol count
                        const baseImage = new Image();
                        baseImage.src = '/images/Cartouche.png';  // Assuming this is your base image
                        baseImage.onload = function() {
                            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
                        };
                        break;
                }
            });
        });
        

    });
});
