# Plán: import starších postav do CE 5.3

## Cíl

Umožnit import každé strukturálně platné postavy ze starší verze do CE 5.3.
Původní záznam zůstane v metadatech. Nová postava dostane nové ID a odkaz na
původní záznam přes `convertedFrom`. Jakmile nová postava existuje, původní se
v seznamu skryje. Po smazání nové postavy se původní záznam znovu zobrazí a lze
jej importovat znovu.

Import nebude vyžadovat potvrzení. Na řádku bude přímo vidět jméno postavy,
například tlačítko `Importovat „Conan“ do CE 5.3`.

Záznamy, které nejsou strukturálně platnými postavami, se nezobrazí vůbec a
nebudou součástí varování ani nabídky importu. Stávající platné 5.3 postavy se
chovají beze změny.

## Pravidla převodu

- Nová postava má `rulesVersion: "ce-p5.3"`.
- Nová postava má nové, nekolidující ID.
- Nová postava obsahuje `convertedFrom: oldCharacter.id`.
- Původní záznam se nemaže ani neupravuje.
- Zachovají se obecná data postavy včetně jména, atributů, bondů, poznámek a XP.
- Core talent se vždy nahradí aktuálním core talentem z katalogu 5.3 podle cesty.
- Běžné talenty se ponechají jen při shodě názvu s aktuálním katalogem 5.3.
- Neznámé běžné talenty se vynechají.
- Hodnoty trackerů se nepřenášejí; trackery pocházejí z aktuálního katalogu a
  zůstávají v jejich výchozím stavu.
- Pokud stará postava nemá cestu dostupnou v katalogu 5.3, import se nenabídne.
- Odkaz `convertedFrom` se používá jen pro skrytí již převedeného starého
  záznamu; není potřeba přidávat obecný migrační nebo schema framework.

## Fáze 1 — Doménové rozdělení záznamů

**Stav: dokončeno.**

Přidány jsou `isImportableLegacyCharacter`, `getConvertedFromCharacterIds`,
`getCharacterGroupsFromMetadata` a `getNextCharacterId` v
`src/domain/characters.js`. Klasifikace znovu používá `isSupportedCharacter`
pro kontrolu tvaru; starší záznam musí mít neprázdnou řetězcovou `rulesVersion`,
která se liší od `ce-p5.3`. Stávající UI filtrování zůstává beze změny a import
ani zobrazení starších záznamů se řeší až ve fázi 3.

### Změna

V `src/domain/characters.js` znovu použít `isSupportedCharacter` a přidat
minimální pomocné funkce pro:

- rozpoznání strukturálně platné starší postavy,
- nalezení ID starých postav, na které odkazuje aktuální 5.3 postava přes
  `convertedFrom`,
- rozdělení záznamů na podporované 5.3, importovatelné starší a skryté neplatné
  nebo již převedené,
- získání nového nekolidujícího ID.

`isSupportedCharacter` se nebude rozšiřovat o další validační framework. Stávající
kontrola tvaru zůstane jedinou hranicí pro načtení platné postavy.

### Ověření

Přidat malé doménové ověření do stávajícího testovacího toku nebo nejmenší
vhodný test v `tests/character-list.spec.js`, který prokáže, že:

- platná 5.3 postava je podporovaná,
- platná starší postava je importovatelná,
- neplatný záznam se nevrátí do žádného viditelného seznamu,
- stará postava s existujícím `convertedFrom` se skryje,
- bez odpovídající nové postavy se znovu objeví.

**Výsledek ověření:** Přidán čistý test v `tests/character-list.spec.js`, který
ověřuje platnou 5.3 postavu, importovatelnou starší postavu, skrytí neplatného
záznamu, skrytí již převedené starší postavy, její opětovné zařazení po odebrání
`convertedFrom` odkazu a nekolidující nové ID.

Spuštěno `npm run test:character-list` — 4 testy prošly. Spuštěno `npm run
build` — produkční build prošel (Vite, 53 modulů). Celý `npm run test:e2e` nebyl
spouštěn, protože fáze 1 nemění UI ani importní tok.

## Fáze 2 — Minimální převod dat

### Změna

V `src/domain/characters.js` přidat jednu čistou funkci pro sestavení nové
postavy ze staré postavy a katalogu. Funkce použije existující
`createEmptyCharacter`, `initializeTalent` a katalogové struktury místo kopie
logiky z UI.

Postup převodu:

1. vytvořit prázdnou 5.3 postavu s novým ID,
2. překopírovat zachovávaná běžná pole,
3. nastavit cestu a aktuální core talent podle katalogu,
4. z aktuálního katalogu sestavit mapu talentů podle jména,
5. ponechat shodné běžné talenty, ale bez starých trackerových hodnot,
6. přidat `convertedFrom`.

Trackery se nebudou ručně nulovat přes obecný rekurzivní převod. Použijí se
aktuální katalogové talenty a existující inicializace trackerů, čímž se staré
hodnoty nepřenesou.

### Ověření

Ověřit převod na staré postavě s:

- existujícím i neexistujícím talentem,
- změněným core talentem,
- vyplněnými starými trackery,
- XP a běžnými poli.

Výsledek musí mít aktuální core talent, pouze známé talenty, prázdné výchozí
trackery, stejné XP a stejné zachované údaje.

## Fáze 3 — Zobrazení a import v `CharacterList`

### Změna

V `src/screens/CharacterList.js`:

- zobrazit pouze platné 5.3 postavy a importovatelné starší postavy,
- neplatné a již převedené záznamy nezobrazovat,
- zachovat stávající řádek pro 5.3 postavu,
- staršímu záznamu zobrazit jeho jméno a tlačítko s konkrétním jménem,
- po kliknutí bez potvrzení načíst aktuální metadata, vytvořit konvertovanou
  postavu a zapsat ji přes existující `writeSceneMetadata`,
- použít existující metadata patchování tak, aby se zachovaly pooly, chat,
  GM data i všechny ostatní postavy.

Předat katalog cest a background talentů do seznamu stejným způsobem, jakým se
již předává katalog do `PathScreen`. Nepřidávat nový globální stav ani nový
transport dat.

### Ověření

Rozšířit `tests/character-list.spec.js` o scénář, který:

- zobrazí starou platnou postavu včetně jejího jména,
- ověří tlačítko `Importovat „Jméno“ do CE 5.3`,
- klikne na něj bez dialogu,
- ověří novou postavu s novým ID, verzí `ce-p5.3` a `convertedFrom`,
- ověří, že stará postava zmizí ze seznamu,
- ověří, že původní záznam zůstal nezměněný.

## Fáze 4 — Znovuimportování po smazání nové postavy

### Změna

Znovu použít existující `buildCharacterRemovePatch`. Po smazání konvertované
postavy se nebude upravovat starý záznam; při dalším načtení se pouze přestane
nacházet jeho ID mezi `convertedFrom` odkazy.

### Ověření

Ve stejném nebo navazujícím testu:

- smazat novou konvertovanou postavu,
- ověřit, že stará postava se znovu objeví,
- znovu ji importovat,
- ověřit vznik nové postavy s novým ID.

## Fáze 5 — Odstranění starého varování a regresní kontrola

### Změna

Odstranit nebo přestat používat `hasUnsupportedCharacters` pro záznamy, které
se nemají zobrazovat. Text `Some saved characters are unsupported...` se nebude
zobrazovat kvůli neplatným ani importovatelným starým záznamům.

Aktualizovat pouze dotčené testy a případně README, pokud stále popisuje staré
chování jako jedinou možnost.

### Ověření

Spustit:

```bash
npm run test:character-list
npm run test:e2e
npm run build
```

Regresní testy musí potvrdit, že:

- platné 5.3 postavy lze dál otevřít, upravit a smazat,
- neplatné záznamy nejsou v UI vůbec vidět,
- starší platné postavy lze importovat,
- po převodu se neztrácí metadata mimo novou postavu,
- po smazání nové postavy lze starou znovu importovat.

## Očekávaný rozsah změn

Preferované soubory:

- `src/domain/characters.js`
- `src/screens/CharacterList.js`
- `src/app/AppShell.js` pouze kvůli předání již načteného katalogu, pokud to
  nepůjde vyřešit existující závislostí
- `src/core/metadata.js` pouze pokud bude nutné zachovat společné filtrování
- `tests/character-list.spec.js`
- `import_old_characters_plan.md`

Nevytvářet nový migrační systém, nový typ úložiště, druhou kopii katalogu ani
automatický převod trackerů.
