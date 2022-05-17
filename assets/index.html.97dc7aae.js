import{j as n}from"./app.3007fb9e.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h1><h2 id="debounce" tabindex="-1"><a class="header-anchor" href="#debounce" aria-hidden="true">#</a> Debounce</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>
    zxcvbnAsync<span class="token punctuation">,</span>
    debounce<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@zxcvbn-ts/core&#39;</span>

<span class="token keyword">let</span> result
<span class="token keyword">const</span> <span class="token function-variable function">someCallableFunction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token comment">// ...do your magic for example get the value from an input field or somewhere else</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">getInputValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    result <span class="token operator">=</span> <span class="token function">zxcvbnAsync</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> debouncedZxcvbn <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span>someCallableFunction<span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span>


<span class="token comment">// than you can call debouncedZxcvbn and if it is in the timeframe of 200ms the someCallableFunction will only be called once</span>
<span class="token function">debouncedZxcvbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">debouncedZxcvbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">debouncedZxcvbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">debouncedZxcvbn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div>`,3);function p(c,t){return e}var u=s(a,[["render",p]]);export{u as default};
