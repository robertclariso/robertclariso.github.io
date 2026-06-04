import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Copy, Check, Info, Settings, FileText, ChevronDown } from 'lucide-react';

// --- TRANSLATIONS AND DATA DICTIONARIES ---

const i18n = {
  ca: {
    headerTitle: "Declaració d'ús d'IA Generativa",
    authorsSection: "1. Autoria",
    authorNameLabel: "Nom complet de l'autor/a",
    addAuthor: "Afegeix autor/a",
    workTypeLabel: "Tipus de treball",
    individual: "Individual",
    group: "Grupal",
    aiUsageSection: "2. Ús d'IA Generativa",
    aiQuestion: "Has utilitzat eines d'Intel·ligència Artificial generativa en la creació d'aquest contingut?",
    yes: "Sí, he utilitzat IA generativa",
    no: "No, no he utilitzat IA generativa",
    contentSection: "3. Continguts i lliurables",
    addContent: "Afegeix un contingut",
    contentTypeLabel: "Tipus de contingut",
    contentNameLabel: "Nom o etiqueta (opcional, ex: 'Lliurament 1')",
    toolsLabel: "Eines d'IA utilitzades (nom i versió, ex: Gemini 2.5 Pro)",
    usesLabel: "Quins usos n'has fet?",
    outputSection: "4. Resultat de la declaració",
    outputLangLabel: "Idioma de la declaració",
    copyBtn: "Copia el text",
    copiedBtn: "Copiat!",
    noAiGeneratedSingle: "Jo, {authors}, declaro que el lliurament efectuat és fruit del meu treball individual i que en aquest lliurable NO he utilitzat cap eina d'Intel·ligència Artificial generativa.",
    noAiGeneratedPlural: "Nosaltres, {authors}, declarem que en aquest lliurable NO hem utilitzat cap eina d'Intel·ligència Artificial generativa.",
    aiGeneratedIntroSingle: "Jo, {authors}, declaro que el lliurament efectuat és fruit del meu treball individual i que en aquest lliurable he utilitzat la IA generativa",
    aiGeneratedIntroPlural: "Nosaltres, {authors}, declarem que en aquest lliurable hem utilitzat la IA generativa",
    forFollowingContents: " per als següents continguts:",
    forContent: " per a ",
    withFollowingUses: " amb els següents usos: ",
    usedToolsSingle: "He utilitzat l'eina: ",
    usedToolsPlural: "Hem utilitzat l'eina: ",
    aiGeneratedOutroSingle: "Incloc els prompts utilitzats com a annex al lliurament.",
    aiGeneratedOutroPlural: "Incloem els prompts utilitzats com a annex al lliurament.",
    usesText: "usos",
    toolsText: "Eines utilitzades",
    selectOption: "Selecciona una opció...",
    removeContent: "Elimina contingut",
    contentTypes: {
      doc: "Un document (informe, assaig, article científic, …)",
      pres: "Una presentació de diapositives",
      graf: "Un recurs gràfic (imatge, fotografia, infografia, gràfica, …)",
      av: "Un recurs audiovisual (vídeo, podcast, entrevista, gravació, …)",
      soft: "Un programari (eina, aplicació interactiva, pàgina web, …)"
    }
  },
  es: {
    headerTitle: "Declaración de uso de IA Generativa",
    authorsSection: "1. Autoría",
    authorNameLabel: "Nombre completo del autor/a",
    addAuthor: "Añadir autor/a",
    workTypeLabel: "Tipo de trabajo",
    individual: "Individual",
    group: "Grupal",
    aiUsageSection: "2. Uso de IA Generativa",
    aiQuestion: "¿Has utilizado herramientas de Inteligencia Artificial generativa en la creación de este contenido?",
    yes: "Sí, he utilizado IA generativa",
    no: "No, no he utilizado IA generativa",
    contentSection: "3. Contenidos y entregables",
    addContent: "Añadir un contenido",
    contentTypeLabel: "Tipo de contenido",
    contentNameLabel: "Nombre o etiqueta (opcional, ej: 'Entrega 1')",
    toolsLabel: "Herramientas de IA utilizadas (nombre y versión, ej: Gemini 2.5 Pro)",
    usesLabel: "¿Qué usos le has dado?",
    outputSection: "4. Resultado de la declaración",
    outputLangLabel: "Idioma de la declaración",
    copyBtn: "Copiar texto",
    copiedBtn: "¡Copiado!",
    noAiGeneratedSingle: "Yo, {authors}, declaro que la entrega efectuada es fruto de mi trabajo individual y que en este entregable NO he utilizado ninguna herramienta de Inteligencia Artificial generativa.",
    noAiGeneratedPlural: "Nosotros, {authors}, declaramos que en este entregable NO hemos utilizado ninguna herramienta de Inteligencia Artificial generativa.",
    aiGeneratedIntroSingle: "Yo, {authors}, declaro que la entrega efectuada es fruto de mi trabajo individual y que en este entregable he utilizado la IA generativa",
    aiGeneratedIntroPlural: "Nosotros, {authors}, declaramos que en este entregable hemos utilizado la IA generativa",
    forFollowingContents: " para los siguientes contenidos:",
    forContent: " para ",
    withFollowingUses: " con los siguientes usos: ",
    usedToolsSingle: "He utilizado la herramienta: ",
    usedToolsPlural: "Hemos utilizado la herramienta: ",
    aiGeneratedOutroSingle: "Incluyo los prompts utilizados como anexo en la entrega.",
    aiGeneratedOutroPlural: "Incluimos los prompts utilizados como anexo en la entrega.",
    usesText: "usos",
    toolsText: "Herramientas utilizadas",
    selectOption: "Selecciona una opción...",
    removeContent: "Eliminar contenido",
    contentTypes: {
      doc: "Un documento (informe, ensayo, artículo científico, …)",
      pres: "Una presentación de diapositivas",
      graf: "Un recurso gráfico (imagen, fotografía, infografía, gráfica, …)",
      av: "Un recurso audiovisual (vídeo, podcast, entrevista, grabación, …)",
      soft: "Un software (herramienta, aplicación interactiva, página web, …)"
    }
  },
  en: {
    headerTitle: "Generative AI Usage Declaration",
    authorsSection: "1. Authorship",
    authorNameLabel: "Author's full name",
    addAuthor: "Add author",
    workTypeLabel: "Type of work",
    individual: "Individual",
    group: "Group",
    aiUsageSection: "2. Generative AI Usage",
    aiQuestion: "Have you used Generative Artificial Intelligence tools in the creation of this content?",
    yes: "Yes, I have used Generative AI",
    no: "No, I haven't used Generative AI",
    contentSection: "3. Contents and deliverables",
    addContent: "Add content",
    contentTypeLabel: "Content type",
    contentNameLabel: "Name or label (optional, e.g.: 'Submission 1')",
    toolsLabel: "AI Tools used (name and version, e.g.: Gemini 2.5 Pro)",
    usesLabel: "What were the uses?",
    outputSection: "4. Declaration Output",
    outputLangLabel: "Declaration language",
    copyBtn: "Copy text",
    copiedBtn: "Copied!",
    noAiGeneratedSingle: "I, {authors}, declare that the submitted work is the result of my individual effort and that in this deliverable I have NOT used any Generative Artificial Intelligence tools.",
    noAiGeneratedPlural: "We, {authors}, declare that in this deliverable we have NOT used any Generative Artificial Intelligence tools.",
    aiGeneratedIntroSingle: "I, {authors}, declare that the submitted work is the result of my individual effort and that in this deliverable I have used Generative AI",
    aiGeneratedIntroPlural: "We, {authors}, declare that in this deliverable we have used Generative AI",
    forFollowingContents: " for the following contents:",
    forContent: " for ",
    withFollowingUses: " with the following uses: ",
    usedToolsSingle: "I have used the tool: ",
    usedToolsPlural: "We have used the tool: ",
    aiGeneratedOutroSingle: "I include the prompts used as an annex to the submission.",
    aiGeneratedOutroPlural: "We include the prompts used as an annex to the submission.",
    usesText: "uses",
    toolsText: "Tools used",
    selectOption: "Select an option...",
    removeContent: "Remove content",
    contentTypes: {
      doc: "A document (report, essay, scientific article, …)",
      pres: "A slide presentation",
      graf: "A graphic resource (image, photograph, infographic, chart, …)",
      av: "An audiovisual resource (video, podcast, interview, recording, …)",
      soft: "Software (tool, interactive application, webpage, …)"
    }
  }
};

const aiUsesLists = {
  doc_pres: [
    { id: 'dp1', ca: "Pluja d'idees", es: "Lluvia de ideas", en: "Brainstorming" },
    { id: 'dp2', ca: "Cerca d'informació", es: "Búsqueda de información", en: "Information search" },
    { id: 'dp3', ca: "Síntesi d'informació", es: "Síntesis de información", en: "Information synthesis" },
    { id: 'dp4', ca: "Locució de veu", es: "Locución de voz", en: "Voiceover" },
    { id: 'dp5', ca: "Transcripció de vídeos", es: "Transcripción de vídeos", en: "Video transcription" },
    { id: 'dp6', ca: "Creació de dades sintètiques (exemples, proves, textos o imatges de mostra, ...)", es: "Creación de datos sintéticos", en: "Creation of synthetic data" },
    { id: 'dp7', ca: "Preparació d’un guió de continguts", es: "Preparación de un guion de contenidos", en: "Preparation of a content script" },
    { id: 'dp8', ca: "Esborrany (versió inicial) d'un document", es: "Borrador (versión inicial) de un documento", en: "Draft (initial version) of a document" },
    { id: 'dp9', ca: "Elaboració de recursos multimèdia (figures, imatges, vídeo, ...)", es: "Elaboración de recursos multimedia", en: "Creation of multimedia resources" },
    { id: 'dp10', ca: "Edició de recursos multimèdia (imatges, vídeo, …)", es: "Edición de recursos multimedia", en: "Editing multimedia resources" },
    { id: 'dp11', ca: "Millora del format i la presentació del document", es: "Mejora del formato y la presentación", en: "Improvement of format and presentation" },
    { id: 'dp12', ca: "Revisió de l'escriptura i la llengua (ortografia, gramàtica, ...)", es: "Revisión de la escritura y la lengua", en: "Writing and language review" },
    { id: 'dp13', ca: "Revisió crítica del lliurable per tenir propostes de millora", es: "Revisión crítica del entregable", en: "Critical review of the deliverable" },
    { id: 'dp14', ca: "Refinament de la versió final del document", es: "Refinamiento de la versión final", en: "Refinement of the final version" },
    { id: 'dp15', ca: "Generació completa del document a partir d’un prompt", es: "Generación completa del documento", en: "Complete generation of the document" }
  ],
  graf: [
    { id: 'g1', ca: "Pluja d'idees", es: "Lluvia de ideas", en: "Brainstorming" },
    { id: 'g2', ca: "Cerca de recursos similars", es: "Búsqueda de recursos similares", en: "Search for similar resources" },
    { id: 'g3', ca: "Esborrany (versió inicial) del recurs", es: "Borrador (versión inicial)", en: "Draft (initial version)" },
    { id: 'g4', ca: "Edició del recurs per introduir millores o canvis", es: "Edición del recurso para mejoras", en: "Editing the resource for improvements" },
    { id: 'g5', ca: "Revisió crítica del contingut per tenir propostes de millora", es: "Revisión crítica del contenido", en: "Critical review of content" },
    { id: 'g6', ca: "Revisió de l'escriptura i la llengua (ortografia, gramàtica, ...)", es: "Revisión de la escritura y la lengua", en: "Writing and language review" },
    { id: 'g7', ca: "Generació automàtica del recurs a partir del prompt", es: "Generación automática", en: "Automatic generation from prompt" }
  ],
  av: [
    { id: 'av1', ca: "Cerca de recursos similars", es: "Búsqueda de recursos similares", en: "Search for similar resources" },
    { id: 'av2', ca: "Cerca d’imatges o fragments d’àudio i vídeo", es: "Búsqueda de imágenes o fragmentos", en: "Search for images or audio/video clips" },
    { id: 'av3', ca: "Preparació del guió", es: "Preparación del guion", en: "Script preparation" },
    { id: 'av4', ca: "Esborrany (versió inicial) del recurs", es: "Borrador (versión inicial)", en: "Draft (initial version)" },
    { id: 'av5', ca: "Edició del recurs per introduir millores o canvis", es: "Edición del recurso para mejoras", en: "Editing the resource for improvements" },
    { id: 'av6', ca: "Revisió crítica del contingut per tenir propostes de millora", es: "Revisión crítica del contenido", en: "Critical review of content" },
    { id: 'av7', ca: "Revisió de l'escriptura i la llengua (ortografia, gramàtica, ...)", es: "Revisión de la escritura y la lengua", en: "Writing and language review" },
    { id: 'av8', ca: "Generació automàtica del recurs a partir del prompt", es: "Generación automática", en: "Automatic generation from prompt" }
  ],
  soft: [
    { id: 's1', ca: "Definició dels requisits (històries d'usuari, ...)", es: "Definición de los requisitos", en: "Requirements definition" },
    { id: 's2', ca: "Disseny de l'aplicació", es: "Diseño de la aplicación", en: "Application design" },
    { id: 's3', ca: "Generació parcial del codi a partir dels requisits", es: "Generación parcial del código", en: "Partial code generation" },
    { id: 's4', ca: "Modificació o extensió d'un codi existent", es: "Modificación o extensión de código", en: "Modification of existing code" },
    { id: 's5', ca: "Generació d'un prototip complet", es: "Generación de un prototipo completo", en: "Generation of complete prototype" },
    { id: 's6', ca: "Generació d'elements del disseny gràfic i l'experiència d'usuari", es: "Generación de elementos gráficos/UX", en: "Generation of UI/UX elements" },
    { id: 's7', ca: "Generació de documentació (comentaris, manuals, ...)", es: "Generación de documentación", en: "Documentation generation" },
    { id: 's8', ca: "Generació de proves", es: "Generación de pruebas", en: "Test generation" }
  ]
};

const getUsesListForType = (type) => {
  if (type === 'doc' || type === 'pres') return aiUsesLists.doc_pres;
  if (type === 'graf') return aiUsesLists.graf;
  if (type === 'av') return aiUsesLists.av;
  if (type === 'soft') return aiUsesLists.soft;
  return [];
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [lang, setLang] = useState('ca');
  const [outputLang, setOutputLang] = useState('ca');
  const [authors, setAuthors] = useState(['']);
  const [isGroup, setIsGroup] = useState(false);
  const [usedAI, setUsedAI] = useState(null); // null, true, false
  const [deliverables, setDeliverables] = useState([]);
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef(null);

  // Initialize from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Language
    const urlLang = params.get('lang');
    if (['ca', 'es', 'en'].includes(urlLang)) {
      setLang(urlLang);
      setOutputLang(urlLang);
    }

    // Work type
    const urlGroup = params.get('group');
    if (urlGroup === 'true') setIsGroup(true);
    
    // Products/Deliverables
    const urlTypes = params.get('types'); // format: doc,pres,soft
    if (urlTypes) {
      const typesMap = {
        'doc': 'doc', 'pres': 'pres', 'graf': 'graf', 'av': 'av', 'soft': 'soft',
        'document': 'doc', 'presentation': 'pres', 'graphic': 'graf', 'audiovisual': 'av', 'software': 'soft'
      };
      
      const parsedTypes = urlTypes.split(',').map(t => t.trim().toLowerCase());
      const initialDeliverables = parsedTypes
        .map(t => typesMap[t])
        .filter(Boolean)
        .map(type => ({
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(),
          type: type,
          label: '',
          tools: '',
          uses: []
        }));
        
      if (initialDeliverables.length > 0) {
        setDeliverables(initialDeliverables);
        setUsedAI(true);
      }
    }
  }, []);

  // Force group if more than 1 author
  useEffect(() => {
    if (authors.length > 1) {
      setIsGroup(true);
    }
  }, [authors]);

  // Handlers
  const handleAuthorChange = (index, value) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const addAuthor = () => {
    setAuthors([...authors, '']);
  };

  const removeAuthor = (index) => {
    if (authors.length > 1) {
      const newAuthors = authors.filter((_, i) => i !== index);
      setAuthors(newAuthors);
    }
  };

  const addDeliverable = () => {
    setDeliverables([...deliverables, { 
      id: Date.now() + Math.random(), 
      type: '', 
      label: '', 
      tools: '', 
      uses: [] 
    }]);
  };

  const updateDeliverable = (id, field, value) => {
    setDeliverables(deliverables.map(d => {
      if (d.id === id) {
        // If changing type, reset uses
        if (field === 'type' && d.type !== value) {
          return { ...d, [field]: value, uses: [] };
        }
        return { ...d, [field]: value };
      }
      return d;
    }));
  };

  const toggleUse = (deliverableId, useId) => {
    setDeliverables(deliverables.map(d => {
      if (d.id === deliverableId) {
        const newUses = d.uses.includes(useId) 
          ? d.uses.filter(u => u !== useId)
          : [...d.uses, useId];
        return { ...d, uses: newUses };
      }
      return d;
    }));
  };

  const removeDeliverable = (id) => {
    setDeliverables(deliverables.filter(d => d.id !== id));
  };

  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text', err);
      }
    }
  };

  // Generate Output Text
  const generateDeclarationText = () => {
    const t = i18n[outputLang];
    
    // Format authors string
    const validAuthors = authors.filter(a => a.trim() !== '');
    
    let conjunction = ' i ';
    if (outputLang === 'es') conjunction = ' y ';
    if (outputLang === 'en') conjunction = ' and ';
    
    const authorsStr = validAuthors.length > 0 
      ? validAuthors.join(', ').replace(/, ([^,]*)$/, conjunction + '$1')
      : '[NOM]';

    const isPlural = isGroup || validAuthors.length > 1;

    // Format NO AI
    if (usedAI === false) {
      return isPlural 
        ? t.noAiGeneratedPlural.replace('{authors}', authorsStr)
        : t.noAiGeneratedSingle.replace('{authors}', authorsStr);
    }

    // Format YES AI
    if (usedAI === true) {
      let text = isPlural 
        ? t.aiGeneratedIntroPlural.replace('{authors}', authorsStr)
        : t.aiGeneratedIntroSingle.replace('{authors}', authorsStr);

      const validDeliverables = deliverables.filter(d => d.type);

      if (validDeliverables.length === 1) {
        // PARAGRAPH MODE (Single content)
        const d = validDeliverables[0];
        const typeName = t.contentTypes[d.type].charAt(0).toLowerCase() + t.contentTypes[d.type].slice(1);
        const labelPart = d.label ? `${d.label} (${typeName})` : typeName;
        
        text += t.forContent + labelPart;

        const usesList = getUsesListForType(d.type);
        const selectedUsesTexts = d.uses.map(useId => {
          const found = usesList.find(u => u.id === useId);
          return found ? found[outputLang] : '';
        }).filter(Boolean);

        if (selectedUsesTexts.length > 0) {
          text += t.withFollowingUses + selectedUsesTexts.join(', ') + ".";
        } else {
          text += ".";
        }

        if (d.tools) {
          text += " " + (isPlural ? t.usedToolsPlural : t.usedToolsSingle) + d.tools + ".";
        }

        text += " " + (isPlural ? t.aiGeneratedOutroPlural : t.aiGeneratedOutroSingle);

      } else if (validDeliverables.length > 1) {
        // LIST MODE (Multiple contents)
        text += t.forFollowingContents + "\n\n";

        validDeliverables.forEach(d => {
          const typeName = t.contentTypes[d.type];
          const labelPart = d.label ? `${d.label} (${typeName})` : typeName;
          const toolsPart = d.tools ? `- ${t.toolsText}: ${d.tools}` : "";
          
          const usesList = getUsesListForType(d.type);
          const selectedUsesTexts = d.uses.map(useId => {
            const found = usesList.find(u => u.id === useId);
            return found ? found[outputLang] : '';
          }).filter(Boolean);
          
          const usesPart = selectedUsesTexts.length > 0 
            ? `- ${t.usesText.charAt(0).toUpperCase() + t.usesText.slice(1)}: ${selectedUsesTexts.join(', ')}` 
            : "";

          text += `• ${labelPart}\n`;
          if (toolsPart) text += `  ${toolsPart}\n`;
          if (usesPart) text += `  ${usesPart}\n`;
          text += "\n";
        });

        text += isPlural ? t.aiGeneratedOutroPlural : t.aiGeneratedOutroSingle;
      } else {
        text += "..."; // Fallback when no content type added yet
      }
      
      return text;
    }

    return "";
  };

  const t = i18n[lang];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-[#000078] text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black tracking-tighter">UOC</div>
            <div className="h-8 w-px bg-white/30 hidden md:block"></div>
            <h1 className="text-xl md:text-2xl font-semibold">{t.headerTitle}</h1>
          </div>
          <div className="flex gap-2">
            {['ca', 'es', 'en'].map(l => (
              <button 
                key={l}
                onClick={() => { setLang(l); setOutputLang(l); }}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${lang === l ? 'bg-[#00B4E6] text-white' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* SECTION 1: Authorship */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#000078] mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#00B4E6]" />
            {t.authorsSection}
          </h2>
          
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">{t.authorNameLabel}</label>
            {authors.map((author, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => handleAuthorChange(idx, e.target.value)}
                  placeholder="Ex: Maria García Pérez"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00B4E6] focus:ring-[#00B4E6] border p-2.5"
                />
                {authors.length > 1 && (
                  <button 
                    onClick={() => removeAuthor(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={addAuthor}
              className="text-sm text-[#00B4E6] font-medium flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> {t.addAuthor}
            </button>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">{t.workTypeLabel}</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="workType" 
                  checked={!isGroup} 
                  onChange={() => setIsGroup(false)}
                  disabled={authors.length > 1}
                  className="text-[#00B4E6] focus:ring-[#00B4E6]"
                />
                <span className={authors.length > 1 ? 'text-gray-400' : ''}>{t.individual}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="workType" 
                  checked={isGroup} 
                  onChange={() => setIsGroup(true)}
                  className="text-[#00B4E6] focus:ring-[#00B4E6]"
                />
                <span>{t.group}</span>
              </label>
            </div>
            {authors.length > 1 && (
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Info className="w-3 h-3" /> Auto-seleccionat en afegir més d'un autor.
              </p>
            )}
          </div>
        </section>

        {/* SECTION 2: AI Usage Question */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#000078] mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#00B4E6]" />
            {t.aiUsageSection}
          </h2>
          
          <p className="font-medium text-gray-800 mb-4">{t.aiQuestion}</p>
          <div className="space-y-3">
            <label className={`block p-4 rounded-lg border cursor-pointer transition-colors ${usedAI === true ? 'border-[#00B4E6] bg-cyan-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="usedAI" 
                  checked={usedAI === true}
                  onChange={() => {
                    setUsedAI(true);
                    if (deliverables.length === 0) addDeliverable();
                  }}
                  className="w-5 h-5 text-[#00B4E6] focus:ring-[#00B4E6]"
                />
                <span className="font-medium">{t.yes}</span>
              </div>
            </label>
            <label className={`block p-4 rounded-lg border cursor-pointer transition-colors ${usedAI === false ? 'border-[#00B4E6] bg-cyan-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="usedAI" 
                  checked={usedAI === false}
                  onChange={() => setUsedAI(false)}
                  className="w-5 h-5 text-[#00B4E6] focus:ring-[#00B4E6]"
                />
                <span className="font-medium">{t.no}</span>
              </div>
            </label>
          </div>
        </section>

        {/* SECTION 3: Deliverables (Only if AI used) */}
        {usedAI === true && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-[#000078] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#00B4E6]" />
              {t.contentSection}
            </h2>

            <div className="space-y-6">
              {deliverables.map((deliv, index) => (
                <div key={deliv.id} className="p-5 bg-gray-50 border border-gray-200 rounded-lg relative">
                  {deliverables.length > 1 && (
                    <button 
                      onClick={() => removeDeliverable(deliv.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                      title={t.removeContent}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contentTypeLabel}</label>
                      <div className="relative">
                        <select 
                          value={deliv.type}
                          onChange={(e) => updateDeliverable(deliv.id, 'type', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4E6] focus:ring-[#00B4E6] border p-2.5 appearance-none bg-white"
                        >
                          <option value="" disabled>{t.selectOption}</option>
                          <option value="doc">{t.contentTypes.doc}</option>
                          <option value="pres">{t.contentTypes.pres}</option>
                          <option value="graf">{t.contentTypes.graf}</option>
                          <option value="av">{t.contentTypes.av}</option>
                          <option value="soft">{t.contentTypes.soft}</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contentNameLabel}</label>
                      <input 
                        type="text" 
                        value={deliv.label}
                        onChange={(e) => updateDeliverable(deliv.id, 'label', e.target.value)}
                        placeholder="Ex: PAC 1, Disseny interfície..."
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4E6] focus:ring-[#00B4E6] border p-2.5 bg-white"
                      />
                    </div>
                  </div>

                  {deliv.type && (
                    <div className="animate-in fade-in duration-300">
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t.toolsLabel}</label>
                        <input 
                          type="text" 
                          value={deliv.tools}
                          onChange={(e) => updateDeliverable(deliv.id, 'tools', e.target.value)}
                          placeholder="Ex: ChatGPT 4o, Gemini Advanced, Midjourney v6..."
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B4E6] focus:ring-[#00B4E6] border p-2.5 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t.usesLabel}</label>
                        <div className="grid md:grid-cols-2 gap-2 bg-white p-4 rounded-md border border-gray-200">
                          {getUsesListForType(deliv.type).map(use => (
                            <label key={use.id} className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                              <input 
                                type="checkbox"
                                checked={deliv.uses.includes(use.id)}
                                onChange={() => toggleUse(deliv.id, use.id)}
                                className="mt-1 text-[#000078] focus:ring-[#000078] rounded border-gray-300"
                              />
                              <span className="text-sm text-gray-700 leading-tight">{use[lang]}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <button 
                onClick={addDeliverable}
                className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg font-medium hover:border-[#00B4E6] hover:text-[#00B4E6] hover:bg-cyan-50/30 transition-colors flex justify-center items-center gap-2"
              >
                <Plus className="w-5 h-5" /> {t.addContent}
              </button>
            </div>
          </section>
        )}

        {/* SECTION 4: Result */}
        {usedAI !== null && (
          <section className="bg-white rounded-xl shadow-sm border border-[#00B4E6] p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h2 className="text-xl font-bold text-[#000078] flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00B4E6]" />
                  {t.outputSection}
                </h2>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">{t.outputLangLabel}:</label>
                  <select 
                    value={outputLang}
                    onChange={(e) => setOutputLang(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-[#00B4E6] focus:ring-[#00B4E6] border p-1.5 text-sm bg-gray-50"
                  >
                    <option value="ca">Català</option>
                    <option value="es">Castellano</option>
                    <option value="en">English</option>
                  </select>
                </div>
             </div>

             <div className="relative">
                <textarea
                  ref={textAreaRef}
                  readOnly
                  value={generateDeclarationText()}
                  className="w-full h-64 p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:ring-[#00B4E6] focus:border-[#00B4E6] resize-y font-mono text-sm leading-relaxed"
                />
                
                <button
                  onClick={handleCopy}
                  className={`absolute bottom-4 right-4 px-4 py-2 rounded-md font-medium flex items-center gap-2 shadow-sm transition-all ${
                    copied 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-[#000078] text-white hover:bg-[#000099]'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t.copiedBtn : t.copyBtn}
                </button>
             </div>
             
             <p className="mt-3 text-sm text-gray-500 italic flex items-center gap-1">
               <Info className="w-4 h-4" /> Copia aquest text i enganxa'l al teu document de lliurament.
             </p>
          </section>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t py-6 text-center text-sm text-gray-500">
        <p>Aquesta eina està basada en les recomanacions d'ús d'IA a la UOC.</p>
      </footer>
    </div>
  );
}