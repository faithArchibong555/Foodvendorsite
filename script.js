  // Cart functionality
        let cart = [];
        const cartModal = document.querySelector('.cart-modal');
        const overlay = document.querySelector('.overlay');
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.querySelector('.cart-items');
        const cartTotalPrice = document.getElementById('cart-total-price');
        const checkoutForm = document.querySelector('.checkout-form');
        const orderConfirmation = document.querySelector('.order-confirmation');

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                const image = this.getAttribute('data-image');
                
                addToCart(id, name, price, image);
            });
        });

        // Add item to cart
        function addToCart(id, name, price, image) {
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity: 1
                });
            }
            
            updateCart();
            openCart();
        }

        // Update cart UI
        function updateCart() {
            cartItems.innerHTML = '';
            let total = 0;
            let count = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                count += item.quantity;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            cartTotalPrice.textContent = `$${total.toFixed(2)}`;
            cartCount.textContent = count;
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    decreaseQuantity(id);
                });
            });
            
            document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    increaseQuantity(id);
                });
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const id = this.getAttribute('data-id');
                    const quantity = parseInt(this.value);
                    updateQuantity(id, quantity);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    removeFromCart(id);
                });
            });
        }

        // Cart quantity functions
        function increaseQuantity(id) {
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
                updateCart();
            }
        }

        function decreaseQuantity(id) {
            const item = cart.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                updateCart();
            }
        }

        function updateQuantity(id, quantity) {
            const item = cart.find(item => item.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
                updateCart();
            }
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }

        // Open cart
        function openCart() {
            cartModal.style.display = 'block';
            overlay.style.display = 'block';
        }

        // Close cart
        function closeCart() {
            cartModal.style.display = 'none';
            overlay.style.display = 'none';
        }

        // Open checkout
        function openCheckout() {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items to your cart before checking out.');
                return;
            }
            
            // Update checkout summary
            const checkoutItems = document.getElementById('checkout-items');
            const checkoutTotal = document.getElementById('checkout-total');
            
            checkoutItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const summaryItem = document.createElement('div');
                summaryItem.className = 'summary-item';
                summaryItem.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                `;
                
                checkoutItems.appendChild(summaryItem);
            });
            
            checkoutTotal.textContent = `$${total.toFixed(2)}`;
            
            closeCart();
            checkoutForm.style.display = 'block';
            overlay.style.display = 'block';
        }

        // Close checkout
        function closeCheckout() {
            checkoutForm.style.display = 'none';
            overlay.style.display = 'none';
        }

        // Show order confirmation
        function showOrderConfirmation() {
            checkoutForm.style.display = 'none';
            orderConfirmation.style.display = 'block';
            
            // Clear cart
            cart = [];
            updateCart();
        }

        // Close order confirmation
        function closeOrderConfirmation() {
            orderConfirmation.style.display = 'none';
            overlay.style.display = 'none';
        }

        // Event listeners
        document.querySelector('.cart-icon').addEventListener('click', openCart);
        document.querySelectorAll('.close-cart').forEach(btn => {
            btn.addEventListener('click', closeCart);
        });
        document.getElementById('view-cart-btn').addEventListener('click', openCart);
        document.getElementById('checkout-btn').addEventListener('click', openCheckout);
        document.querySelector('.checkout-close').addEventListener('click', closeCheckout);
        document.getElementById('confirmation-close').addEventListener('click', closeOrderConfirmation);
        overlay.addEventListener('click', function() {
            closeCart();
            closeCheckout();
            closeOrderConfirmation();
        });

        // Checkout form submission
        document.getElementById('checkout-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showOrderConfirmation();
        });

        // Testimonial Slider
        const slider = document.querySelector('.testimonial-slider');
        const dots = document.querySelectorAll('.testimonial-dot');
        let currentIndex = 0;

        function showTestimonial(index) {
            slider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentIndex = index;
        }

        // Add click events to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });

        // Auto-advance testimonials
        setInterval(() => {
            let nextIndex = (currentIndex + 1) % dots.length;
            showTestimonial(nextIndex);
        }, 5000);

        // Mobile menu toggle
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            document.querySelector('nav').style.display = 
                document.querySelector('nav').style.display === 'block' ? 'none' : 'block';
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking a link
                    if(window.innerWidth <= 768) {
                        document.querySelector('nav').style.display = 'none';
                    }
                }
            });
        });