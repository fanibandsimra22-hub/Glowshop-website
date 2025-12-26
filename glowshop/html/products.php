<?php
header('Content-Type: application/json');

$productsFile = 'products.json';
$products = file_exists($productsFile) ? file_get_contents($productsFile) : '[]';

echo $products;
?>

