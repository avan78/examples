Examples obsahuje některé ukázky mé práce:
Sliders je kolekce sliderů do Storybooku. Důležitý je DateSlider, zadáním bylo utvořit horizontální posuvník, na kterém můžu vybrat časovou osu 1 bod nebo rozpětí - vždy převádí datum do formátu měsíc/rok.
Main slider je prototyp všeobecného posuvníku s jedním bodem nebo škálou, můžou být až tři nad sebou, hodnoty je možno zobrazit jako datum, možnost nastavení sx.
Input DatePicker byl vytvořen pro jiný projekt, jde o výběr data s použitím nové verze date pickeru z knihovny MUI. Je zde dán maximální a minimální časový rozsah, ošetření formátu data pomocí moment.js,
nastavena validace. Dále jsem dělala např. funkce pro různé inputy, tlačítka apod. ve Storybooku i v samotném projektu. Nebo např. stories pro složité komponenty, např. naplnění tabulky daty, nastavení filtrování. 

Složka Pieces obsahuje některé soubory z projektů, na nichž jsem spolupracovala s kolegy, např. custom hook useValidator navrhnul vedoucí kolega, já jsem do něj poté přidávala jednotlivá pravidla (kromě prvního) a poté je použila ve formulářích a filtrech.
Rozšiřovala jsem také postupně nabídku filtrovacích polí. "SortingBy" je jedno z nich, je volitelně aktivní či neaktivní, uživatel si vybere z nabídky, podle čeho má filtrovat, obsahuje dvě validační podmínky. Texty jsou extrahovány do samostatného souboru .json
Příklad errors.js je část kódu z globálního zachytávání errorů, řadí error zprávy podle druhu, na jejichž základě vypisuje do toastu zprávu pro uživatele.
Zabývala jsem se vedle jiného také voláním dat z BE, zde je soubor Document Queries z druhého projektu. Připojila jsem se již do rozpracované aplikace, všechny queries zde byly volány custom hookem. Přidávala jsem do něj tedy nové GQL dotazy a zvlášť nastavovala filtry. V prvním projektu jsme volali data přes Axios, tam jsem např. sestavovala podmínky pro skládání GQL dotazů.

Jinak mým posledním úkolem bylo globální zachytávání chyb. Plánovala jsem použít Context provider obalující aplikaci a Error boundary (výjimečně jde v Reactu o class). Úkol provázelo několik komplikací a vzhledem k tomu, že jsem již odcházela, jsem jej k dokončení nakonec předala kolegovi.

