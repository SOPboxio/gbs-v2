"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DinnerDeciderPage() {
  useEffect(() => {
    // Type definitions
    interface Recipe {
      id: number;
      name: string;
      ingredients: string[];
    }

    interface Ingredient {
      name: string;
      quantity: string;
      status: string;
    }

    interface AppData {
      recipes: Recipe[];
      ingredients: Record<string, Ingredient>;
      mealHistory: Array<{ recipeId: number; date: string }>;
      familyMembers: string[];
      lastMealIngredients: string[];
    }

    interface CachedElements {
      recipeGrid: HTMLElement | null;
      inventoryList: HTMLElement | null;
      shoppingList: HTMLElement | null;
      familyMembers: HTMLTextAreaElement | null;
      voteBtn: HTMLButtonElement | null;
      spinBtn: HTMLButtonElement | null;
      rouletteBtn: HTMLButtonElement | null;
      saveSettingsBtn: HTMLButtonElement | null;
      resetBtn: HTMLButtonElement | null;
      debugBtn: HTMLButtonElement | null;
      voteModal: HTMLElement | null;
      closeModalBtn: HTMLButtonElement | null;
      submitVotesBtn: HTMLButtonElement | null;
      votersContainer: HTMLElement | null;
      spinnerModal: HTMLElement | null;
      closeSpinnerBtn: HTMLButtonElement | null;
      spinWheelBtn: HTMLButtonElement | null;
      spinnerCanvas: HTMLCanvasElement | null;
    }

    // Configuration
    const CONFIG = {
      RECIPE_COOLDOWN_DAYS: 3,
      STORAGE_KEY: 'dinnerAppData',
      DEFAULT_DATA: {
        recipes: [
          {
            id: 1,
            name: "Mac & Cheese with Ground Beef",
            ingredients: ["mac-cheese-box", "ground-beef", "cheddar-cheese", "butter", "milk"]
          },
          {
            id: 2,
            name: "Cut Spaghetti with Meatballs",
            ingredients: ["spaghetti", "marinara-sauce", "frozen-meatballs"]
          },
          {
            id: 3,
            name: "Homemade Pepperoni Pizza",
            ingredients: ["pizza-crust", "pizza-sauce", "mozzarella", "pepperoni"]
          },
          {
            id: 4,
            name: "Chicken Stroganoff",
            ingredients: ["chicken-breast", "mushrooms", "sour-cream", "chicken-broth", "flour", "paprika", "egg-noodles"]
          },
          {
            id: 5,
            name: "Rotisserie Chicken & Pasta",
            ingredients: ["rotisserie-chicken", "pasta", "frozen-peas", "parmesan", "butter"]
          },
          {
            id: 6,
            name: "Salmon with White Sauce",
            ingredients: ["salmon-fillets", "butter", "flour", "milk"]
          }
        ],
        ingredients: {
          "mac-cheese-box": { name: "Mac & Cheese Box", quantity: "1 box", status: "got_it" },
          "ground-beef": { name: "Ground Beef", quantity: "1 lb", status: "got_it" },
          "cheddar-cheese": { name: "Cheddar Cheese", quantity: "1 cup", status: "got_it" },
          "butter": { name: "Butter", quantity: "1 stick", status: "got_it" },
          "milk": { name: "Milk", quantity: "1 cup", status: "got_it" },
          "spaghetti": { name: "Spaghetti", quantity: "1 box", status: "got_it" },
          "marinara-sauce": { name: "Marinara Sauce", quantity: "1 jar", status: "got_it" },
          "frozen-meatballs": { name: "Frozen Meatballs", quantity: "12 count", status: "got_it" },
          "pizza-crust": { name: "Pizza Crust", quantity: "1 prepared crust", status: "got_it" },
          "pizza-sauce": { name: "Pizza Sauce", quantity: "1/2 cup", status: "got_it" },
          "mozzarella": { name: "Mozzarella Cheese", quantity: "1 cup", status: "got_it" },
          "pepperoni": { name: "Pepperoni", quantity: "1 package", status: "got_it" },
          "chicken-breast": { name: "Chicken Breast", quantity: "1 lb", status: "got_it" },
          "mushrooms": { name: "Sliced Mushrooms", quantity: "1 cup", status: "got_it" },
          "sour-cream": { name: "Sour Cream", quantity: "1/2 cup", status: "got_it" },
          "chicken-broth": { name: "Chicken Broth", quantity: "1 cup", status: "got_it" },
          "flour": { name: "Flour", quantity: "1 tbsp", status: "got_it" },
          "paprika": { name: "Paprika", quantity: "1 tsp", status: "got_it" },
          "egg-noodles": { name: "Egg Noodles", quantity: "2 cups cooked", status: "got_it" },
          "rotisserie-chicken": { name: "Rotisserie Chicken", quantity: "2 cups shredded", status: "got_it" },
          "pasta": { name: "Pasta", quantity: "2 cups cooked", status: "got_it" },
          "frozen-peas": { name: "Frozen Peas", quantity: "1/2 cup", status: "got_it" },
          "parmesan": { name: "Parmesan Cheese", quantity: "1/4 cup", status: "got_it" },
          "salmon-fillets": { name: "Salmon Fillets", quantity: "2 fillets", status: "got_it" }
        },
        mealHistory: [],
        familyMembers: ["Parent 1", "Parent 2", "Kid 1", "Kid 2"],
        lastMealIngredients: []
      }
    };

    // State Management
    class AppState {
      data: AppData;
      listeners: Array<() => void>;

      constructor() {
        this.data = this.loadData();
        this.listeners = [];
      }

      loadData() {
        try {
          const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (!parsed.ingredients || !parsed.recipes || !parsed.familyMembers) {
              console.warn('Invalid data structure, resetting to defaults');
              return this.getDefaultData();
            }
            if (!parsed.mealHistory) parsed.mealHistory = [];
            if (!parsed.lastMealIngredients) parsed.lastMealIngredients = [];
            return parsed;
          }
        } catch (e) {
          console.error('Error loading data:', e);
        }
        return this.getDefaultData();
      }

      getDefaultData() {
        return JSON.parse(JSON.stringify(CONFIG.DEFAULT_DATA));
      }

      saveData() {
        try {
          localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.data));
          this.notifyListeners();
        } catch (e) {
          console.error('Error saving data:', e);
        }
      }

      clearHistory() {
        this.data.mealHistory = [];
        this.data.lastMealIngredients = [];
      }

      subscribe(callback: () => void) {
        this.listeners.push(callback);
      }

      notifyListeners() {
        this.listeners.forEach(callback => callback());
      }

      updateIngredient(key: string, status: string) {
        if (this.data.ingredients[key]) {
          this.data.ingredients[key].status = status;
          this.data.lastMealIngredients = this.data.lastMealIngredients.filter((k: string) => k !== key);
          this.saveData();
        }
      }

      updateFamilyMembers(members: string[]) {
        this.data.familyMembers = members;
        this.saveData();
      }

      recordMeal(recipeId: number) {
        const recipe = this.data.recipes.find((r: Recipe) => r.id === recipeId);
        if (!recipe) return;

        const today = new Date().toISOString().split('T')[0];
        this.data.mealHistory.push({ recipeId, date: today });
        this.data.lastMealIngredients = [...recipe.ingredients];
        this.saveData();
      }

      getRecipeStatus(recipe: Recipe) {
        const missing = recipe.ingredients.filter(
          key => this.data.ingredients[key]?.status === 'need_it'
        );

        if (missing.length > 0) {
          const names = missing.map(key => this.data.ingredients[key].name).join(', ');
          return { available: false, reason: `Need: ${names}` };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cooldownDate = new Date(today);
        cooldownDate.setDate(today.getDate() - CONFIG.RECIPE_COOLDOWN_DAYS);

        const recentlyEaten = this.data.mealHistory.some(record => {
          return record.recipeId === recipe.id && new Date(record.date) >= cooldownDate;
        });

        if (recentlyEaten) {
          return { available: false, reason: 'Eaten recently' };
        }

        return { available: true, reason: '' };
      }

      getAvailableRecipes() {
        return this.data.recipes.filter(r => this.getRecipeStatus(r).available);
      }
    }

    // UI Controller
    class UIController {
      state: AppState;
      elements: CachedElements;
      isSpinning?: boolean;
      availableRecipes?: Recipe[];

      constructor(state: AppState) {
        this.state = state;
        this.elements = this.cacheElements();
        this.attachEventListeners();
        this.state.subscribe(() => this.render());
      }

      cacheElements() {
        return {
          recipeGrid: document.getElementById('recipeGrid'),
          inventoryList: document.getElementById('inventoryList'),
          shoppingList: document.getElementById('shoppingList'),
          familyMembers: document.getElementById('familyMembers') as HTMLTextAreaElement | null,
          voteBtn: document.getElementById('voteBtn') as HTMLButtonElement | null,
          spinBtn: document.getElementById('spinBtn') as HTMLButtonElement | null,
          rouletteBtn: document.getElementById('rouletteBtn') as HTMLButtonElement | null,
          saveSettingsBtn: document.getElementById('saveSettingsBtn') as HTMLButtonElement | null,
          resetBtn: document.getElementById('resetBtn') as HTMLButtonElement | null,
          debugBtn: document.getElementById('debugBtn') as HTMLButtonElement | null,
          voteModal: document.getElementById('voteModal'),
          closeModalBtn: document.getElementById('closeModalBtn') as HTMLButtonElement | null,
          submitVotesBtn: document.getElementById('submitVotesBtn') as HTMLButtonElement | null,
          votersContainer: document.getElementById('votersContainer'),
          spinnerModal: document.getElementById('spinnerModal'),
          closeSpinnerBtn: document.getElementById('closeSpinnerBtn') as HTMLButtonElement | null,
          spinWheelBtn: document.getElementById('spinWheelBtn') as HTMLButtonElement | null,
          spinnerCanvas: document.getElementById('spinnerCanvas') as HTMLCanvasElement | null
        };
      }

      attachEventListeners() {
        this.elements.recipeGrid.addEventListener('click', (e) => {
          const card = e.target.closest('.recipe-card');
          if (card && !card.classList.contains('disabled')) {
            const recipeId = parseInt(card.dataset.recipeId);
            this.handleRecipeClick(recipeId);
          }
        });

        this.elements.inventoryList.addEventListener('change', (e) => {
          if (e.target.type === 'checkbox') {
            const key = e.target.dataset.key;
            const status = e.target.checked ? 'got_it' : 'need_it';
            this.state.updateIngredient(key, status);
          }
        });

        this.elements.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.elements.resetBtn.addEventListener('click', () => this.resetHistory());
        this.elements.debugBtn.addEventListener('click', () => this.showDebug());
        this.elements.voteBtn.addEventListener('click', () => this.openVoteModal());
        this.elements.spinBtn.addEventListener('click', () => this.openSpinnerModal());
        this.elements.rouletteBtn.addEventListener('click', () => this.dinnerRoulette());
        this.elements.closeModalBtn.addEventListener('click', () => this.closeVoteModal());
        this.elements.submitVotesBtn.addEventListener('click', () => this.tallyVotes());
        this.elements.closeSpinnerBtn.addEventListener('click', () => this.closeSpinnerModal());
        this.elements.spinWheelBtn.addEventListener('click', () => this.spinWheel());

        this.elements.voteModal.addEventListener('click', (e) => {
          if (e.target === this.elements.voteModal) this.closeVoteModal();
        });

        this.elements.spinnerModal.addEventListener('click', (e) => {
          if (e.target === this.elements.spinnerModal) this.closeSpinnerModal();
        });
      }

      render() {
        this.renderRecipes();
        this.renderInventory();
        this.renderShoppingList();
        this.renderSettings();
      }

      renderRecipes() {
        const recipes = this.state.data.recipes;
        let availableCount = 0;

        this.elements.recipeGrid.innerHTML = recipes.map(recipe => {
          const status = this.state.getRecipeStatus(recipe);
          if (status.available) availableCount++;

          return `
            <div class="recipe-card ${status.available ? '' : 'disabled'}"
                 data-recipe-id="${recipe.id}">
              <h3>${recipe.name}</h3>
              ${!status.available ? `<p class="reason">${status.reason}</p>` : ''}
            </div>
          `;
        }).join('');

        this.elements.voteBtn.disabled = availableCount < 2;
        this.elements.spinBtn.disabled = availableCount < 1;
        this.elements.rouletteBtn.disabled = availableCount < 1;
      }

      renderInventory() {
        const ingredients = this.state.data.ingredients;
        const sortedKeys = Object.keys(ingredients).sort((a, b) =>
          ingredients[a].name.localeCompare(ingredients[b].name)
        );

        this.elements.inventoryList.innerHTML = sortedKeys.map(key => {
          const ing = ingredients[key];
          const isLowStock = this.state.data.lastMealIngredients.includes(key);
          const checked = ing.status === 'got_it';

          return `
            <li class="inventory-item ${isLowStock ? 'low-stock' : ''}">
              <div class="info">
                <span class="name">${ing.name}</span>
                <span class="quantity">${ing.quantity}</span>
              </div>
              <label class="toggle">
                <input type="checkbox" data-key="${key}" ${checked ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </li>
          `;
        }).join('');
      }

      renderShoppingList() {
        const needItems = Object.values(this.state.data.ingredients)
          .filter(ing => ing.status === 'need_it');

        if (needItems.length === 0) {
          this.elements.shoppingList.innerHTML = '<li class="empty">✅ All stocked up!</li>';
        } else {
          this.elements.shoppingList.innerHTML = needItems
            .map(ing => `<li>${ing.name} (${ing.quantity})</li>`)
            .join('');
        }
      }

      renderSettings() {
        this.elements.familyMembers.value = this.state.data.familyMembers.join('\\n');
      }

      handleRecipeClick(recipeId: number) {
        const recipe = this.state.data.recipes.find((r: Recipe) => r.id === recipeId);
        if (!recipe) return;

        if (confirm(`Choose ${recipe.name} for dinner tonight?`)) {
          this.state.recordMeal(recipeId);
          alert(`🎉 Dinner is decided! Tonight we're having ${recipe.name}.`);
        }
      }

      saveSettings() {
        const input = this.elements.familyMembers.value;
        const members = input.split('\\n')
          .map(name => name.trim())
          .filter(name => name.length > 0);

        if (members.length === 0) {
          alert('Please enter at least one family member.');
          return;
        }

        this.state.updateFamilyMembers(members);
        alert('✅ Settings saved!');
      }

      resetHistory() {
        if (!confirm('⚠️ Clear all meal history? This will make all recipes available again and reload the page.')) {
          return;
        }

        this.state.clearHistory();
        this.state.saveData();
        location.reload();
      }

      showDebug() {
        const info = `
=== DEBUG INFO ===

Meal History (${this.state.data.mealHistory.length} entries):
${JSON.stringify(this.state.data.mealHistory, null, 2)}

Last Meal Ingredients:
${JSON.stringify(this.state.data.lastMealIngredients, null, 2)}

Today's Date: ${new Date().toISOString().split('T')[0]}
Cooldown Days: ${CONFIG.RECIPE_COOLDOWN_DAYS}

Available Recipes: ${this.state.getAvailableRecipes().length} / ${this.state.data.recipes.length}
        `;
        console.log(info);
        alert('Debug info logged to console. Press F12 to view.');
      }

      dinnerRoulette() {
        const available = this.state.getAvailableRecipes();

        if (available.length === 0) {
          alert('No meals are available! Check your ingredients.');
          return;
        }

        const random = available[Math.floor(Math.random() * available.length)];
        this.state.recordMeal(random.id);
        alert(`🎲 Quick Pick chose: ${random.name}!`);
      }

      openVoteModal() {
        const available = this.state.getAvailableRecipes();

        if (available.length < 2) {
          alert('You need at least two available options to vote.');
          return;
        }

        const optionsHtml = available
          .map(r => `<option value="${r.id}">${r.name}</option>`)
          .join('');

        this.elements.votersContainer.innerHTML = this.state.data.familyMembers
          .map(member => `
            <div class="voter-group">
              <label for="vote-${member}">${member}'s Vote:</label>
              <select id="vote-${member}">
                <option value="">-- Choose a meal --</option>
                ${optionsHtml}
              </select>
            </div>
          `).join('');

        this.elements.voteModal.style.display = 'block';
      }

      closeVoteModal() {
        this.elements.voteModal.style.display = 'none';
      }

      tallyVotes() {
        const selects = this.elements.votersContainer.querySelectorAll('select');
        const votes = {};

        selects.forEach(select => {
          const recipeId = select.value;
          if (recipeId) {
            votes[recipeId] = (votes[recipeId] || 0) + 1;
          }
        });

        if (Object.keys(votes).length === 0) {
          alert('No votes were cast!');
          return;
        }

        const maxVotes = Math.max(...Object.values(votes));
        const winners = Object.keys(votes)
          .filter(id => votes[id] === maxVotes)
          .map(id => parseInt(id));

        let winnerId;
        if (winners.length === 1) {
          winnerId = winners[0];
        } else {
          winnerId = winners[Math.floor(Math.random() * winners.length)];
          alert('🤝 It was a tie! A random winner was chosen.');
        }

        const recipe = this.state.data.recipes.find(r => r.id === winnerId);
        this.closeVoteModal();
        this.state.recordMeal(winnerId);
        alert(`🗳️ The votes are in! Tonight we're having ${recipe.name}.`);
      }

      openSpinnerModal() {
        const available = this.state.getAvailableRecipes();

        if (available.length === 0) {
          alert('No meals are available! Check your ingredients.');
          return;
        }

        this.availableRecipes = available;
        this.isSpinning = false;
        this.drawWheel();
        this.elements.spinnerModal.style.display = 'block';
      }

      closeSpinnerModal() {
        this.elements.spinnerModal.style.display = 'none';
        this.elements.spinnerCanvas.style.transform = 'rotate(0deg)';
      }

      drawWheel() {
        const canvas = this.elements.spinnerCanvas;
        const ctx = canvas.getContext('2d');
        const recipes = this.availableRecipes;
        const numSegments = recipes.length;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2;

        const colors = [
          '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
          '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
          '#F8B739', '#52BE80'
        ];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const anglePerSegment = (2 * Math.PI) / numSegments;

        recipes.forEach((recipe, i) => {
          const startAngle = i * anglePerSegment;
          const endAngle = startAngle + anglePerSegment;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, endAngle);
          ctx.closePath();
          ctx.fillStyle = colors[i % colors.length];
          ctx.fill();
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(startAngle + anglePerSegment / 2);
          ctx.textAlign = 'right';
          ctx.fillStyle = 'white';
          ctx.font = 'bold 16px Arial';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 3;
          ctx.fillText(recipe.name, radius - 40, 5);
          ctx.restore();
        });
      }

      spinWheel() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.elements.spinWheelBtn.disabled = true;

        const recipes = this.availableRecipes;
        const numSegments = recipes.length;
        const winnerIndex = Math.floor(Math.random() * numSegments);

        const anglePerSegment = 360 / numSegments;
        const targetAngle = 360 - (winnerIndex * anglePerSegment) - (anglePerSegment / 2);
        const spins = 5;
        const totalRotation = (spins * 360) + targetAngle;

        const canvas = this.elements.spinnerCanvas;
        const startTime = Date.now();
        const duration = 4000;

        const animate = () => {
          const now = Date.now();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentRotation = totalRotation * easeOut;

          canvas.style.transform = `rotate(${currentRotation}deg)`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setTimeout(() => {
              const winner = recipes[winnerIndex];
              this.closeSpinnerModal();
              this.state.recordMeal(winner.id);
              alert(`🎉 The wheel has spoken! Tonight we're having ${winner.name}!`);
              this.isSpinning = false;
              this.elements.spinWheelBtn.disabled = false;
            }, 500);
          }
        };

        requestAnimationFrame(animate);
      }
    }

    // Initialize App
    const appState = new AppState();
    const ui = new UIController(appState);
    ui.render();
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --primary-bg: #f4f7f6;
          --secondary-bg: #ffffff;
          --text-color: #333;
          --accent-color: #4a90e2;
          --accent-hover: #357abd;
          --disabled-color: #a0a0a0;
          --disabled-bg: #e9e9e9;
          --warning-color: #f5a623;
          --border-color: #ddd;
          --shadow: 0 2px 4px rgba(0,0,0,0.1);
          --success-color: #4CAF50;
        }

        .dinner-app {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: var(--primary-bg);
          color: var(--text-color);
          min-height: 100vh;
          padding: 20px;
          line-height: 1.6;
        }

        .app-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: var(--accent-color);
          text-decoration: none;
          font-size: 0.9em;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .dinner-app h1 {
          text-align: center;
          color: var(--accent-color);
          margin-bottom: 30px;
          font-size: 2rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .card {
          background: var(--secondary-bg);
          border-radius: 8px;
          padding: 20px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }

        .card h2 {
          margin-top: 0;
          color: var(--accent-color);
          font-size: 1.5rem;
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 10px;
        }

        .card h3 {
          font-size: 1.1rem;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        /* Recipe Cards */
        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .recipe-card {
          border: 2px solid var(--border-color);
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: var(--secondary-bg);
          min-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .recipe-card:hover:not(.disabled) {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
          border-color: var(--accent-color);
        }

        .recipe-card.disabled {
          background-color: var(--disabled-bg);
          color: var(--disabled-color);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .recipe-card h3 {
          margin: 0 0 8px 0;
          font-size: 1rem;
        }

        .recipe-card .reason {
          font-size: 0.85em;
          font-style: italic;
          color: #666;
        }

        /* Buttons */
        .button-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 15px;
        }

        .dinner-app button {
          padding: 12px 24px;
          font-size: 1em;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background-color: var(--accent-color);
          color: white;
          transition: all 0.2s;
          font-weight: 500;
        }

        .dinner-app button:hover:not(:disabled) {
          background-color: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .dinner-app button:disabled {
          background-color: var(--disabled-color);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .dinner-app button.danger {
          background-color: #dc3545;
        }

        .dinner-app button.danger:hover:not(:disabled) {
          background-color: #c82333;
        }

        /* Inventory List */
        .inventory-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .inventory-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.2s;
        }

        .inventory-item:hover {
          background-color: #f9f9f9;
        }

        .inventory-item:last-child {
          border-bottom: none;
        }

        .inventory-item .info {
          flex: 1;
        }

        .inventory-item .name {
          font-weight: 500;
          display: block;
        }

        .inventory-item .quantity {
          font-size: 0.85em;
          color: #666;
        }

        .inventory-item.low-stock .name::after {
          content: ' ⚠️';
          font-size: 0.9em;
        }

        /* Toggle Switch */
        .toggle {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.3s;
          border-radius: 26px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        .toggle input:checked + .toggle-slider {
          background-color: var(--success-color);
        }

        .toggle input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }

        /* Shopping List */
        .shopping-list {
          list-style: none;
          padding: 0;
        }

        .shopping-list li {
          padding: 8px 12px;
          background: #fff3cd;
          margin-bottom: 8px;
          border-radius: 4px;
          border-left: 3px solid var(--warning-color);
        }

        .shopping-list .empty {
          text-align: center;
          color: var(--success-color);
          font-weight: 500;
          background: transparent;
          border: none;
        }

        /* Settings */
        .settings-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: inherit;
          font-size: 1em;
          resize: vertical;
        }

        .settings-note {
          font-size: 0.85em;
          color: #777;
          margin-top: 10px;
        }

        /* Modal */
        .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.5);
        }

        .modal-content {
          background-color: var(--secondary-bg);
          margin: 5% auto;
          padding: 30px;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-header h2 {
          margin: 0;
          color: var(--accent-color);
        }

        .close-btn {
          font-size: 28px;
          font-weight: bold;
          color: #aaa;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          width: 30px;
          height: 30px;
          line-height: 1;
        }

        .close-btn:hover {
          color: #000;
          transform: none;
        }

        .voter-group {
          margin-bottom: 15px;
        }

        .voter-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .voter-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-size: 1em;
          font-family: inherit;
        }

        /* Spinner Wheel */
        .spinner-container {
          position: relative;
          width: 400px;
          height: 400px;
          margin: 20px auto 10px auto;
        }

        .spinner-wheel {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: relative;
          transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
        }

        .spinner-arrow {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 40px solid #ff4444;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          z-index: 10;
        }

        .spinner-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          border: 4px solid var(--accent-color);
          z-index: 5;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }

        .spin-button {
          display: block;
          margin: 0 auto;
          padding: 15px 40px;
          font-size: 1.2em;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 50px;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .spin-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .spin-button:disabled {
          background: var(--disabled-color);
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .recipe-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }

          .dinner-app h1 {
            font-size: 1.5rem;
          }

          .spinner-container {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>

      <div className="dinner-app">
        <div className="app-container">
          <Link href="/mini" className="back-link">
            ← Back to Mini Projects
          </Link>

          <h1>🍽️ Family Dinner Decider</h1>

          <div className="grid">
            {/* Recipes Section */}
            <div className="card">
              <h2>What&apos;s for Dinner?</h2>
              <div id="recipeGrid" className="recipe-grid"></div>
              <div className="button-group">
                <button id="voteBtn">Let&apos;s Vote!</button>
                <button id="spinBtn">Spin the Wheel!</button>
                <button id="rouletteBtn">Quick Pick</button>
              </div>
            </div>

            {/* Inventory Section */}
            <div className="card">
              <h2>Pantry & Shopping</h2>
              <h3>My Ingredients</h3>
              <ul id="inventoryList" className="inventory-list"></ul>

              <h3>Shopping List</h3>
              <ul id="shoppingList" className="shopping-list"></ul>
            </div>

            {/* Settings Section */}
            <div className="card">
              <h2>Settings</h2>
              <label htmlFor="familyMembers"><strong>Family Members</strong> (one per line):</label>
              <textarea id="familyMembers" className="settings-input" rows={5}></textarea>
              <div className="button-group">
                <button id="saveSettingsBtn">Save Settings</button>
                <button id="resetBtn" className="danger">Reset History</button>
              </div>
              <p className="settings-note">
                💾 Your recipes, inventory, and settings are saved automatically in your browser.
              </p>
              <button id="debugBtn" style={{ marginTop: '10px', background: '#6c757d' }}>Show Debug Info</button>
            </div>
          </div>
        </div>

        {/* Vote Modal */}
        <div id="voteModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Cast Your Votes</h2>
              <button className="close-btn" id="closeModalBtn">&times;</button>
            </div>
            <div id="votersContainer"></div>
            <button id="submitVotesBtn" style={{ width: '100%', marginTop: '20px' }}>Tally Votes</button>
          </div>
        </div>

        {/* Spinner Modal */}
        <div id="spinnerModal" className="modal">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2>Spin the Wheel!</h2>
              <button className="close-btn" id="closeSpinnerBtn">&times;</button>
            </div>
            <div className="spinner-container">
              <div className="spinner-arrow"></div>
              <canvas id="spinnerCanvas" width="400" height="400"></canvas>
              <div className="spinner-center"></div>
            </div>
            <button id="spinWheelBtn" className="spin-button">SPIN!</button>
          </div>
        </div>
      </div>
    </>
  );
}
