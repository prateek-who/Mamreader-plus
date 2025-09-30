export function createMamButton(text: string, url: string, iconUrl: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.innerText = text;
    button.onclick = () => window.open(url, '_blank');
    
    const icon = document.createElement('img');
    icon.src = iconUrl;
    icon.alt = 'icon';
    icon.style.width = '22px';
    icon.style.height = '22px';
    icon.style.marginRight = '12px';
    icon.style.verticalAlign = 'middle';
    
    button.prepend(icon);
    
    button.style.backgroundColor = '#ebc210';
    button.style.color = 'black';
    button.style.borderColor = '#ebc210';
    button.style.marginTop = '8px';
    button.style.marginBottom = '8px';

    const hoverColor = '#d1a80e';
    button.addEventListener('mouseenter', () => button.style.backgroundColor = hoverColor);
    button.addEventListener('mouseleave', () => button.style.backgroundColor = '#ebc210');

    return button;
}
