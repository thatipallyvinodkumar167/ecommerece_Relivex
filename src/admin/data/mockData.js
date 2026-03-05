export const mockStats = [
    { title: 'Total Orders', value: '1,280', change: '+12%', icon: 'orders' },
    { title: 'Total Revenue', value: '$45,200', change: '+8%', icon: 'revenue' },
    { title: 'Active Vendors', value: '45', change: '+2', icon: 'vendors' },
    { title: 'Low Stock', value: '12', change: '-3', icon: 'stock' },
    { title: 'Pending Orders', value: '25', change: '+5', icon: 'pending' },
    { title: 'Total Customers', value: '8,420', change: '+18%', icon: 'customers' },
];

export const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', product: 'Backbone Support Belt', vendor: 'HealthCare Plus', amount: 120, status: 'Delivered', date: '2024-03-01' },
    { id: 'ORD-002', customer: 'Jane Smith', product: 'Neck Pain Relief Gel', vendor: 'MedStore', amount: 45, status: 'Pending', date: '2024-03-02' },
    { id: 'ORD-003', customer: 'Robert Brown', product: 'Knee Brace', vendor: 'OrthoCare', amount: 85, status: 'Shipped', date: '2024-03-02' },
    { id: 'ORD-004', customer: 'Emily White', product: 'Joint Pain Capsules', vendor: 'HealthCare Plus', amount: 30, status: 'Confirmed', date: '2024-03-03' },
    { id: 'ORD-005', customer: 'Michael Green', product: 'Muscle Massage Oil', vendor: 'NatureMed', amount: 25, status: 'Cancelled', date: '2024-03-03' },
];

export const products = [
    { id: 1, name: 'Backbone Support Belt', category: 'Backbone Pain', vendor: 'HealthCare Plus', price: 120, stock: 45, sku: 'BB-001', status: 'Active', painType: 'Backbone Pain' },
    { id: 2, name: 'Neck Tension Relief', category: 'Neck Pain', vendor: 'MedStore', price: 35, stock: 120, sku: 'NK-005', status: 'Active', painType: 'Neck Pain' },
    { id: 3, name: 'Knee Compression Sleeve', category: 'Joint Pain', vendor: 'OrthoCare', price: 25, stock: 5, sku: 'JT-012', status: 'Active', painType: 'Joint Pain' },
    { id: 4, name: 'Muscle Recovery Balm', category: 'Muscle Pain', vendor: 'NatureMed', price: 15, stock: 80, sku: 'MS-008', status: 'Inactive', painType: 'Muscle Pain' },
    { id: 5, name: 'Leg Cramp Relief', category: 'Leg Pain', vendor: 'HealthCare Plus', price: 40, stock: 30, sku: 'LG-002', status: 'Active', painType: 'Leg Pain' },
];

export const vendors = [
    { id: 1, name: 'HealthCare Plus', business: 'HC Plus Ltd', contact: '+1234567890', email: 'info@hcplus.com', status: 'Active', commission: 10 },
    { id: 2, name: 'MedStore', business: 'MedStore Pharma', contact: '+1987654321', email: 'sales@medstore.com', status: 'Active', commission: 12 },
    { id: 3, name: 'OrthoCare', business: 'OrthoCare Solutions', contact: '+1122334455', email: 'support@orthocare.com', status: 'Suspended', commission: 15 },
];

export const categories = [
    { id: 1, name: 'Leg Pain', description: 'Products for leg related pains', status: 'Active' },
    { id: 2, name: 'Neck Pain', description: 'Products for neck and cervical relief', status: 'Active' },
    { id: 3, name: 'Backbone Pain', description: 'Products for spine and back support', status: 'Active' },
    { id: 4, name: 'Joint Pain', description: 'Products for arthritis and joint issues', status: 'Active' },
    { id: 5, name: 'Muscle Pain', description: 'Relief for muscle strains and soreness', status: 'Active' },
];

export const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
];

export const salesByCategory = [
    { name: 'Leg Pain', value: 400 },
    { name: 'Neck Pain', value: 300 },
    { name: 'Backbone Pain', value: 300 },
    { name: 'Joint Pain', value: 200 },
];
