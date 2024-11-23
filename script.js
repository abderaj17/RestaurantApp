// Fetch and display the menu items
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const menuItems = await response.json();

        const menuGrid = document.getElementById('menu-grid');
        menuGrid.innerHTML = ''; // Clear existing items

        menuItems.forEach(item => {
            const menuCard = document.createElement('div');
            menuCard.className = 'menu-card';

            menuCard.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button class="btn">Add to Order</button>
            `;

            menuGrid.appendChild(menuCard);
        });
    } catch (error) {
        console.error('Failed to fetch menu:', error);
    }
}

// Simulate taking an order
function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                items: ['Burger A', 'Burger B', 'Burger C']
            });
        }, 2500);
    });
}

// Simulate order preparation
function orderPrep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Simulate payment
function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Display a thank-you message
function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

// Workflow
async function runRestaurantWorkflow() {
    await getMenu();
    const order = await takeOrder();
    console.log('Order:', order);

    const prepStatus = await orderPrep();
    console.log('Order Prepared:', prepStatus);

    const paymentStatus = await payOrder();
    console.log('Payment:', paymentStatus);

    if (paymentStatus.paid) {
        thankyouFnc();
    }
}

// Run workflow on page load
document.addEventListener('DOMContentLoaded', runRestaurantWorkflow);
