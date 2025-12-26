document.querySelector('.quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const skinType = this.skinType.value;
  const concern = this.concern.value;
  const undertone = this.undertone.value;

  let recommendation = '';

  if (skinType === "dry" && concern === "dryness") {
    recommendation = "We recommend: Hydrating Moisturizer and Vitamin C Serum.";
  } else if (skinType === "oily" && concern === "acne") {
    recommendation = "We recommend: Ultra-Light Sunscreen and gentle Foaming Cleanser.";
  } else if (undertone === "warm") {
    recommendation = "Try makeup shades with golden undertones for a radiant glow!";
  } else {
    recommendation = "Explore our full product range for tailored solutions!";
  }

  document.getElementById('quiz-result').textContent = recommendation;
});
