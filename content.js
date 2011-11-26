;(function(window, document){

function CssViewer(){
var kCHARSET_RULE_MISSING_SEMICOLON="Missing semicolon at the end of @charset rule",kCHARSET_RULE_CHARSET_IS_STRING="The charset in the @charset rule should be a string",kCHARSET_RULE_MISSING_WS="Missing mandatory whitespace after @charset",kIMPORT_RULE_MISSING_URL="Missing URL in @import rule",kURL_EOF="Unexpected end of stylesheet",kURL_WS_INSIDE="Multiple tokens inside a url() notation",kVARIABLES_RULE_POSITION="@variables rule invalid at this position in the stylesheet",kIMPORT_RULE_POSITION=
"@import rule invalid at this position in the stylesheet",kNAMESPACE_RULE_POSITION="@namespace rule invalid at this position in the stylesheet",kCHARSET_RULE_CHARSET_SOF="@charset rule invalid at this position in the stylesheet",kUNKNOWN_AT_RULE="Unknow @-rule",kENGINES=["webkit","presto","trident","generic"],kCSS_VENDOR_VALUES={"-moz-box":{webkit:"-webkit-box",presto:"",trident:"",generic:"box"},"-moz-inline-box":{webkit:"-webkit-inline-box",presto:"",trident:"",generic:"inline-box"},"-moz-initial":{webkit:"",
presto:"",trident:"",generic:"initial"},"-moz-linear-gradient":{webkit20110101:FilterLinearGradientForOutput,webkit:FilterLinearGradientForOutput,presto:"",trident:"",generic:FilterLinearGradientForOutput},"-moz-radial-gradient":{webkit20110101:FilterRadialGradientForOutput,webkit:FilterRadialGradientForOutput,presto:"",trident:"",generic:FilterRadialGradientForOutput},"-moz-repeating-linear-gradient":{webkit20110101:"",webkit:FilterRepeatingGradientForOutput,presto:"",trident:"",generic:FilterRepeatingGradientForOutput},
"-moz-repeating-radial-gradient":{webkit20110101:"",webkit:FilterRepeatingGradientForOutput,presto:"",trident:"",generic:FilterRepeatingGradientForOutput}},kCSS_VENDOR_PREFIXES={lastUpdate:1304175007,properties:[{gecko:"",webkit:"",presto:"",trident:"-ms-accelerator",status:"P"},{gecko:"",webkit:"",presto:"-wap-accesskey",trident:"",status:""},{gecko:"-moz-animation",webkit:"-webkit-animation",presto:"",trident:"",status:"WD"},{gecko:"-moz-animation-delay",webkit:"-webkit-animation-delay",presto:"",
trident:"",status:"WD"},{gecko:"-moz-animation-direction",webkit:"-webkit-animation-direction",presto:"",trident:"",status:"WD"},{gecko:"-moz-animation-duration",webkit:"-webkit-animation-duration",presto:"",trident:"",status:"WD"},{gecko:"-moz-animation-fill-mode",webkit:"-webkit-animation-fill-mode",presto:"",trident:"",status:"ED"},{gecko:"-moz-animation-iteration-count",webkit:"-webkit-animation-iteration-count",presto:"",trident:"",status:"WD"},{gecko:"-moz-animation-name",webkit:"-webkit-animation-name",
presto:"",trident:"",status:"WD"},{gecko:"-moz-animation-play-state",webkit:"-webkit-animation-play-state",presto:"",trident:"",status:"WD"},{gecko:"-moz-animation-timing-function",webkit:"-webkit-animation-timing-function",presto:"",trident:"",status:"WD"},{gecko:"-moz-appearance",webkit:"-webkit-appearance",presto:"",trident:"",status:"CR"},{gecko:"",webkit:"-webkit-backface-visibility",presto:"",trident:"",status:"WD"},{gecko:"background-clip",webkit:"-webkit-background-clip",presto:"background-clip",
trident:"background-clip",status:"WD"},{gecko:"",webkit:"-webkit-background-composite",presto:"",trident:"",status:""},{gecko:"-moz-background-inline-policy",webkit:"",presto:"",trident:"",status:"P"},{gecko:"background-origin",webkit:"-webkit-background-origin",presto:"background-origin",trident:"background-origin",status:"WD"},{gecko:"",webkit:"background-position-x",presto:"",trident:"-ms-background-position-x",status:""},{gecko:"",webkit:"background-position-y",presto:"",trident:"-ms-background-position-y",
status:""},{gecko:"background-size",webkit:"-webkit-background-size",presto:"background-size",trident:"background-size",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-behavior",status:""},{gecko:"-moz-binding",webkit:"",presto:"",trident:"",status:"P"},{gecko:"",webkit:"",presto:"",trident:"-ms-block-progression",status:""},{gecko:"",webkit:"-webkit-border-after",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-after-color",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-after-style",
presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-after-width",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-before",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-before-color",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-before-style",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-before-width",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-bottom-colors",webkit:"",presto:"",trident:"",status:"P"},
{gecko:"border-bottom-left-radius",webkit:"-webkit-border-bottom-left-radius",presto:"border-bottom-left-radius",trident:"border-bottom-left-radius",status:"WD"},{gecko:"",webkit:"-webkit-border-bottom-left-radius = border-bottom-left-radius",presto:"",trident:"",status:""},{gecko:"border-bottom-right-radius",webkit:"-webkit-border-bottom-right-radius",presto:"border-bottom-right-radius",trident:"border-bottom-right-radius",status:"WD"},{gecko:"",webkit:"-webkit-border-bottom-right-radius = border-bottom-right-radius",
presto:"",trident:"",status:""},{gecko:"-moz-border-end",webkit:"-webkit-border-end",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-end-color",webkit:"-webkit-border-end-color",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-end-style",webkit:"-webkit-border-end-style",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-end-width",webkit:"-webkit-border-end-width",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-border-fit",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-border-horizontal-spacing",
presto:"",trident:"",status:""},{gecko:"-moz-border-image",webkit:"-webkit-border-image",presto:"-o-border-image",trident:"",status:"WD"},{gecko:"-moz-border-left-colors",webkit:"",presto:"",trident:"",status:"P"},{gecko:"border-radius",webkit:"-webkit-border-radius",presto:"border-radius",trident:"border-radius",status:"WD"},{gecko:"-moz-border-right-colors",webkit:"",presto:"",trident:"",status:"P"},{gecko:"-moz-border-start",webkit:"-webkit-border-start",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-start-color",
webkit:"-webkit-border-start-color",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-start-style",webkit:"-webkit-border-start-style",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-start-width",webkit:"-webkit-border-start-width",presto:"",trident:"",status:"ED"},{gecko:"-moz-border-top-colors",webkit:"",presto:"",trident:"",status:"P"},{gecko:"border-top-left-radius",webkit:"-webkit-border-top-left-radius",presto:"border-top-left-radius",trident:"border-top-left-radius",status:"WD"},
{gecko:"",webkit:"-webkit-border-top-left-radius = border-top-left-radius",presto:"",trident:"",status:""},{gecko:"border-top-right-radius",webkit:"-webkit-border-top-right-radius",presto:"border-top-right-radius",trident:"border-top-right-radius",status:"WD"},{gecko:"",webkit:"-webkit-border-top-right-radius = border-top-right-radius",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-border-vertical-spacing",presto:"",trident:"",status:""},{gecko:"-moz-box-align",webkit:"-webkit-box-align",
presto:"",trident:"-ms-box-align",status:"WD"},{gecko:"-moz-box-direction",webkit:"-webkit-box-direction",presto:"",trident:"-ms-box-direction",status:"WD"},{gecko:"-moz-box-flex",webkit:"-webkit-box-flex",presto:"",trident:"-ms-box-flex",status:"WD"},{gecko:"",webkit:"-webkit-box-flex-group",presto:"",trident:"",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-box-line-progression",status:""},{gecko:"",webkit:"-webkit-box-lines",presto:"",trident:"-ms-box-lines",status:"WD"},{gecko:"-moz-box-ordinal-group",
webkit:"-webkit-box-ordinal-group",presto:"",trident:"-ms-box-ordinal-group",status:"WD"},{gecko:"-moz-box-orient",webkit:"-webkit-box-orient",presto:"",trident:"-ms-box-orient",status:"WD"},{gecko:"-moz-box-pack",webkit:"-webkit-box-pack",presto:"",trident:"-ms-box-pack",status:"WD"},{gecko:"",webkit:"-webkit-box-reflect",presto:"",trident:"",status:""},{gecko:"box-shadow",webkit:"-webkit-box-shadow",presto:"box-shadow",trident:"box-shadow",status:"WD"},{gecko:"-moz-box-sizing",webkit:"box-sizing",
presto:"box-sizing",trident:"",status:"CR"},{gecko:"",webkit:"-webkit-box-sizing = box-sizing",presto:"",trident:"",status:""},{gecko:"",webkit:"-epub-caption-side = caption-side",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-color-correction",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-column-break-after",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-column-break-before",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-column-break-inside",presto:"",
trident:"",status:""},{gecko:"-moz-column-count",webkit:"-webkit-column-count",presto:"column-count",trident:"column-count",status:"CR"},{gecko:"-moz-column-gap",webkit:"-webkit-column-gap",presto:"column-gap",trident:"column-gap",status:"CR"},{gecko:"-moz-column-rule",webkit:"-webkit-column-rule",presto:"column-rule",trident:"column-rule",status:"CR"},{gecko:"-moz-column-rule-color",webkit:"-webkit-column-rule-color",presto:"column-rule-color",trident:"column-rule-color",status:"CR"},{gecko:"-moz-column-rule-style",
webkit:"-webkit-column-rule-style",presto:"column-rule-style",trident:"column-rule-style",status:"CR"},{gecko:"-moz-column-rule-width",webkit:"-webkit-column-rule-width",presto:"column-rule-width",trident:"column-rule-width",status:"CR"},{gecko:"",webkit:"-webkit-column-span",presto:"column-span",trident:"column-span",status:"CR"},{gecko:"-moz-column-width",webkit:"-webkit-column-width",presto:"column-width",trident:"column-width",status:"CR"},{gecko:"",webkit:"-webkit-columns",presto:"columns",trident:"columns",
status:"CR"},{gecko:"",webkit:"-webkit-dashboard-region",presto:"-apple-dashboard-region",trident:"",status:""},{gecko:"filter",webkit:"",presto:"filter",trident:"-ms-filter",status:""},{gecko:"-moz-float-edge",webkit:"",presto:"",trident:"",status:"P"},{gecko:"",webkit:"",presto:"-o-focus-opacity",trident:"",status:""},{gecko:"-moz-font-feature-settings",webkit:"",presto:"",trident:"",status:""},{gecko:"-moz-font-language-override",webkit:"",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-font-size-delta",
presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-font-smoothing",presto:"",trident:"",status:""},{gecko:"-moz-force-broken-image-icon",webkit:"",presto:"",trident:"",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-column",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-column-align",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-column-span",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-columns",status:"WD"},{gecko:"",webkit:"",presto:"",
trident:"-ms-grid-layer",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-row",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-row-align",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-row-span",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-grid-rows",status:"WD"},{gecko:"",webkit:"-webkit-highlight",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-hyphenate-character",presto:"",trident:"",status:"WD"},{gecko:"",webkit:"-webkit-hyphenate-limit-after",
presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-hyphenate-limit-before",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-hyphens",presto:"",trident:"",status:"WD"},{gecko:"",webkit:"-epub-hyphens = -webkit-hyphens",presto:"",trident:"",status:""},{gecko:"-moz-image-region",webkit:"",presto:"",trident:"",status:"P"},{gecko:"ime-mode",webkit:"",presto:"",trident:"-ms-ime-mode",status:""},{gecko:"",webkit:"",presto:"-wap-input-format",trident:"",status:""},{gecko:"",webkit:"",presto:"-wap-input-required",
trident:"",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-interpolation-mode",status:""},{gecko:"",webkit:"",presto:"-xv-interpret-as",trident:"",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-layout-flow",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-layout-grid",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-layout-grid-char",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-layout-grid-line",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-layout-grid-mode",
status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-layout-grid-type",status:""},{gecko:"",webkit:"-webkit-line-box-contain",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-line-break",presto:"",trident:"-ms-line-break",status:""},{gecko:"",webkit:"-webkit-line-clamp",presto:"",trident:"",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-line-grid-mode",status:""},{gecko:"",webkit:"",presto:"-o-link",trident:"",status:""},{gecko:"",webkit:"",presto:"-o-link-source",trident:"",status:""},
{gecko:"",webkit:"-webkit-locale",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-logical-height",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-logical-width",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-margin-after",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-margin-after-collapse",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-margin-before",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-margin-before-collapse",presto:"",
trident:"",status:""},{gecko:"",webkit:"-webkit-margin-bottom-collapse",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-margin-collapse",presto:"",trident:"",status:""},{gecko:"-moz-margin-end",webkit:"-webkit-margin-end",presto:"",trident:"",status:"ED"},{gecko:"-moz-margin-start",webkit:"-webkit-margin-start",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-margin-top-collapse",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-marquee",presto:"",trident:"",status:""},
{gecko:"",webkit:"",presto:"-wap-marquee-dir",trident:"",status:""},{gecko:"",webkit:"-webkit-marquee-direction",presto:"",trident:"",status:"WD"},{gecko:"",webkit:"-webkit-marquee-increment",presto:"",trident:"",status:""},{gecko:"",webkit:"",presto:"-wap-marquee-loop",trident:"",status:"WD"},{gecko:"",webkit:"-webkit-marquee-repetition",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-marquee-speed",presto:"-wap-marquee-speed",trident:"",status:"WD"},{gecko:"",webkit:"-webkit-marquee-style",
presto:"-wap-marquee-style",trident:"",status:"WD"},{gecko:"mask",webkit:"-webkit-mask",presto:"mask",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-attachment",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-box-image",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-clip",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-composite",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-image",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-origin",
presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-position",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-position-x",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-position-y",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-repeat",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-repeat-x",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-repeat-y",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-mask-size",
presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-match-nearest-mail-blockquote-color",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-max-logical-height",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-max-logical-width",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-min-logical-height",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-min-logical-width",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"",presto:"-o-mini-fold",trident:"",status:""},
{gecko:"",webkit:"-webkit-nbsp-mode",presto:"",trident:"",status:"P"},{gecko:"",webkit:"",presto:"-o-object-fit",trident:"",status:"ED"},{gecko:"",webkit:"",presto:"-o-object-position",trident:"",status:"ED"},{gecko:"opacity",webkit:"-webkit-opacity",presto:"opacity",trident:"opacity",status:"WD"},{gecko:"",webkit:"-webkit-opacity = opacity",presto:"",trident:"",status:""},{gecko:"-moz-outline-radius",webkit:"",presto:"",trident:"",status:"P"},{gecko:"-moz-outline-radius-bottomleft",webkit:"",presto:"",
trident:"",status:"P"},{gecko:"-moz-outline-radius-bottomright",webkit:"",presto:"",trident:"",status:"P"},{gecko:"-moz-outline-radius-topleft",webkit:"",presto:"",trident:"",status:"P"},{gecko:"-moz-outline-radius-topright",webkit:"",presto:"",trident:"",status:"P"},{gecko:"overflow-x",webkit:"overflow-x",presto:"overflow-x",trident:"-ms-overflow-x",status:"WD"},{gecko:"overflow-y",webkit:"overflow-y",presto:"overflow-y",trident:"-ms-overflow-y",status:"WD"},{gecko:"",webkit:"-webkit-padding-after",
presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-padding-before",presto:"",trident:"",status:"ED"},{gecko:"-moz-padding-end",webkit:"-webkit-padding-end",presto:"",trident:"",status:"ED"},{gecko:"-moz-padding-start",webkit:"-webkit-padding-start",presto:"",trident:"",status:"ED"},{gecko:"",webkit:"-webkit-perspective",presto:"",trident:"",status:"WD"},{gecko:"",webkit:"-webkit-perspective-origin",presto:"",trident:"",status:"WD"},{gecko:"",webkit:"-webkit-perspective-origin-x",presto:"",
trident:"",status:""},{gecko:"",webkit:"-webkit-perspective-origin-y",presto:"",trident:"",status:""},{gecko:"",webkit:"",presto:"-xv-phonemes",trident:"",status:""},{gecko:"",webkit:"-webkit-rtl-ordering",presto:"",trident:"",status:"P"},{gecko:"-moz-script-level",webkit:"",presto:"",trident:"",status:""},{gecko:"-moz-script-min-size",webkit:"",presto:"",trident:"",status:""},{gecko:"-moz-script-size-multiplier",webkit:"",presto:"",trident:"",status:""},{gecko:"",webkit:"",presto:"scrollbar-3dlight-color",
trident:"-ms-scrollbar-3dlight-color",status:"P"},{gecko:"",webkit:"",presto:"scrollbar-arrow-color",trident:"-ms-scrollbar-arrow-color",status:"P"},{gecko:"",webkit:"",presto:"scrollbar-base-color",trident:"-ms-scrollbar-base-color",status:"P"},{gecko:"",webkit:"",presto:"scrollbar-darkshadow-color",trident:"-ms-scrollbar-darkshadow-color",status:"P"},{gecko:"",webkit:"",presto:"scrollbar-face-color",trident:"-ms-scrollbar-face-color",status:"P"},{gecko:"",webkit:"",presto:"scrollbar-highlight-color",
trident:"-ms-scrollbar-highlight-color",status:"P"},{gecko:"",webkit:"",presto:"scrollbar-shadow-color",trident:"-ms-scrollbar-shadow-color",status:"P"},{gecko:"",webkit:"",presto:"scrollbar-track-color",trident:"-ms-scrollbar-track-color",status:"P"},{gecko:"-moz-stack-sizing",webkit:"",presto:"",trident:"",status:"P"},{gecko:"",webkit:"-webkit-svg-shadow",presto:"",trident:"",status:""},{gecko:"-moz-tab-size",webkit:"",presto:"-o-tab-size",trident:"",status:""},{gecko:"",webkit:"",presto:"-o-table-baseline",
trident:"",status:""},{gecko:"",webkit:"-webkit-tap-highlight-color",presto:"",trident:"",status:"P"},{gecko:"",webkit:"",presto:"",trident:"-ms-text-align-last",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-text-autospace",status:"WD"},{gecko:"-moz-text-blink",webkit:"",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-text-combine",presto:"",trident:"",status:""},{gecko:"",webkit:"-epub-text-combine = -webkit-text-combine",presto:"",trident:"",status:""},{gecko:"-moz-text-decoration-color",
webkit:"",presto:"",trident:"",status:""},{gecko:"-moz-text-decoration-line",webkit:"",presto:"",trident:"",status:""},{gecko:"-moz-text-decoration-style",webkit:"",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-text-decorations-in-effect",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-text-emphasis",presto:"",trident:"",status:""},{gecko:"",webkit:"-epub-text-emphasis = -webkit-text-emphasis",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-text-emphasis-color",presto:"",
trident:"",status:""},{gecko:"",webkit:"-epub-text-emphasis-color = -webkit-text-emphasis-color",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-text-emphasis-position",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-text-emphasis-style",presto:"",trident:"",status:""},{gecko:"",webkit:"-epub-text-emphasis-style = -webkit-text-emphasis-style",presto:"",trident:"",status:""},{gecko:"",webkit:"-webkit-text-fill-color",presto:"",trident:"",status:"P"},{gecko:"",webkit:"",presto:"",
trident:"-ms-text-justify",status:"WD"},{gecko:"",webkit:"",presto:"",trident:"-ms-text-kashida-space",status:"P"},{gecko:"",webkit:"-webkit-text-orientation",presto:"",trident:"",status:""},{gecko:"",webkit:"-epub-text-orientation = -webkit-text-orientation",presto:"",trident:"",status:""},{gecko:"",webkit:"text-overflow",presto:"text-overflow",trident:"-ms-text-overflow",status:"WD"},{gecko:"",webkit:"-webkit-text-security",presto:"",trident:"",status:"P"},{gecko:"",webkit:"-webkit-text-size-adjust",
presto:"",trident:"-ms-text-size-adjust",status:""},{gecko:"",webkit:"-webkit-text-stroke",presto:"",trident:"",status:"P"},{gecko:"",webkit:"-webkit-text-stroke-color",presto:"",trident:"",status:"P"},{gecko:"",webkit:"-webkit-text-stroke-width",presto:"",trident:"",status:"P"},{gecko:"",webkit:"-epub-text-transform = text-transform",presto:"",trident:"",status:""},{gecko:"",webkit:"",presto:"",trident:"-ms-text-underline-position",status:"P"},{gecko:"",webkit:"-webkit-touch-callout",presto:"",trident:"",
status:"P"},{gecko:"-moz-transform",webkit:"-webkit-transform",presto:"-o-transform",trident:"-ms-transform",status:"WD"},{gecko:"-moz-transform-origin",webkit:"-webkit-transform-origin",presto:"-o-transform-origin",trident:"-ms-transform-origin",status:"WD"},{gecko:"",webkit:"-webkit-transform-origin-x",presto:"",trident:"",status:"P"},{gecko:"",webkit:"-webkit-transform-origin-y",presto:"",trident:"",status:"P"},{gecko:"",webkit:"-webkit-transform-origin-z",presto:"",trident:"",status:"P"},{gecko:"",
webkit:"-webkit-transform-style",presto:"",trident:"",status:"WD"},{gecko:"-moz-transition",webkit:"-webkit-transition",presto:"-o-transition",trident:"",status:"WD"},{gecko:"-moz-transition-delay",webkit:"-webkit-transition-delay",presto:"-o-transition-delay",trident:"",status:"WD"},{gecko:"-moz-transition-duration",webkit:"-webkit-transition-duration",presto:"-o-transition-duration",trident:"",status:"WD"},{gecko:"-moz-transition-property",webkit:"-webkit-transition-property",presto:"-o-transition-property",
trident:"",status:"WD"},{gecko:"-moz-transition-timing-function",webkit:"-webkit-transition-timing-function",presto:"-o-transition-timing-function",trident:"",status:"WD"},{gecko:"",webkit:"-webkit-user-drag",presto:"",trident:"",status:"P"},{gecko:"-moz-user-focus",webkit:"",presto:"",trident:"",status:"P"},{gecko:"-moz-user-input",webkit:"",presto:"",trident:"",status:"P"},{gecko:"-moz-user-modify",webkit:"-webkit-user-modify",presto:"",trident:"",status:"P"},{gecko:"-moz-user-select",webkit:"-webkit-user-select",
presto:"",trident:"",status:"P"},{gecko:"",webkit:"",presto:"-xv-voice-balance",trident:"",status:""},{gecko:"",webkit:"",presto:"-xv-voice-duration",trident:"",status:""},{gecko:"",webkit:"",presto:"-xv-voice-pitch",trident:"",status:""},{gecko:"",webkit:"",presto:"-xv-voice-pitch-range",trident:"",status:""},{gecko:"",webkit:"",presto:"-xv-voice-rate",trident:"",status:""},{gecko:"",webkit:"",presto:"-xv-voice-stress",trident:"",status:""},{gecko:"",webkit:"",presto:"-xv-voice-volume",trident:"",
status:""},{gecko:"-moz-window-shadow",webkit:"",presto:"",trident:"",status:"P"},{gecko:"",webkit:"word-break",presto:"",trident:"-ms-word-break",status:"WD"},{gecko:"",webkit:"-epub-word-break = word-break",presto:"",trident:"",status:""},{gecko:"word-wrap",webkit:"word-wrap",presto:"word-wrap",trident:"-ms-word-wrap",status:"WD"},{gecko:"",webkit:"-webkit-writing-mode",presto:"writing-mode",trident:"-ms-writing-mode",status:"ED"},{gecko:"",webkit:"-epub-writing-mode = -webkit-writing-mode",presto:"",
trident:"",status:""},{gecko:"",webkit:"zoom",presto:"",trident:"-ms-zoom",status:""}]},kCSS_PREFIXED_VALUE=[{gecko:"-moz-box",webkit:"-moz-box",presto:"",trident:"",generic:"box"}],CssInspector={mVENDOR_PREFIXES:null,kEXPORTS_FOR_GECKO:!0,kEXPORTS_FOR_WEBKIT:!0,kEXPORTS_FOR_PRESTO:!0,kEXPORTS_FOR_TRIDENT:!0,cleanPrefixes:function(){this.mVENDOR_PREFIXES=null},prefixesForProperty:function(a){if(!this.mVENDOR_PREFIXES){this.mVENDOR_PREFIXES={};for(var c=0;c<kCSS_VENDOR_PREFIXES.properties.length;c++){var b=
kCSS_VENDOR_PREFIXES.properties[c];if(b.gecko&&(b.webkit||b.presto||b.trident)){var e={};this.kEXPORTS_FOR_GECKO&&(e[b.gecko]=!0);this.kEXPORTS_FOR_WEBKIT&&b.webkit&&(e[b.webkit]=!0);this.kEXPORTS_FOR_PRESTO&&b.presto&&(e[b.presto]=!0);this.kEXPORTS_FOR_TRIDENT&&b.trident&&(e[b.trident]=!0);this.mVENDOR_PREFIXES[b.gecko]=[];for(var f in e)this.mVENDOR_PREFIXES[b.gecko].push(f)}}}return a in this.mVENDOR_PREFIXES?this.mVENDOR_PREFIXES[a].sort():null},parseColorStop:function(a,c){var b=a.parseColor(c),
e="";if(!b)return null;c=a.getToken(!0,!0);if(c.isPercentage()||c.isDimensionOfUnit("cm")||c.isDimensionOfUnit("mm")||c.isDimensionOfUnit("in")||c.isDimensionOfUnit("pc")||c.isDimensionOfUnit("px")||c.isDimensionOfUnit("em")||c.isDimensionOfUnit("ex")||c.isDimensionOfUnit("pt"))e=c.value,a.getToken(!0,!0);return{color:b,position:e}},parseGradient:function(a,c){var b={isRepeating:!1};if(c.isNotNull()&&(c.isFunction("-moz-linear-gradient(")||c.isFunction("-moz-radial-gradient(")||c.isFunction("-moz-repeating-linear-gradient(")||
c.isFunction("-moz-repeating-radial-gradient("))){if(c.isFunction("-moz-radial-gradient(")||c.isFunction("-moz-repeating-radial-gradient("))b.isRadial=!0;if(c.isFunction("-moz-repeating-linear-gradient(")||c.isFunction("-moz-repeating-radial-gradient("))b.isRepeating=!0;var c=a.getToken(!0,!0),e=!1,f=!1,h=!1;if(c.isAngle())b.angle=c.value,h=e=!0,c=a.getToken(!0,!0);if(c.isLength()||c.isIdent("top")||c.isIdent("center")||c.isIdent("bottom")||c.isIdent("left")||c.isIdent("right")){e=!0;if(c.isLength()||
c.isIdent("left")||c.isIdent("right"))f=!0;b.position=c.value;c=a.getToken(!0,!0)}if(e){if(!h&&c.isAngle())b.angle=c.value,h=!0,c=a.getToken(!0,!0);else if(c.isLength()||f&&(c.isIdent("top")||c.isIdent("center")||c.isIdent("bottom"))||!f&&(c.isLength()||c.isIdent("top")||c.isIdent("center")||c.isIdent("bottom")||c.isIdent("left")||c.isIdent("right")))b.position="position"in b?b.position+" ":"",b.position+=c.value,c=a.getToken(!0,!0);if(!h&&c.isAngle())b.angle=c.value,c=a.getToken(!0,!0);if(!c.isSymbol(","))return null;
c=a.getToken(!0,!0)}if(b.isRadial){if(c.isIdent("circle")||c.isIdent("ellipse"))b.shape=c.value,c=a.getToken(!0,!0);if(c.isIdent("closest-side")||c.isIdent("closest-corner")||c.isIdent("farthest-side")||c.isIdent("farthest-corner")||c.isIdent("contain")||c.isIdent("cover"))b.size=c.value,c=a.getToken(!0,!0);if(!("shape"in b)&&(c.isIdent("circle")||c.isIdent("ellipse")))b.shape=c.value,c=a.getToken(!0,!0);if(("shape"in b||"size"in b)&&!c.isSymbol(","))return null;if("shape"in b||"size"in b)c=a.getToken(!0,
!0)}e=this.parseColorStop(a,c);if(!e)return null;c=a.currentToken();if(!c.isSymbol(","))return null;c=a.getToken(!0,!0);f=this.parseColorStop(a,c);if(!f)return null;c=a.currentToken();c.isSymbol(",")&&(c=a.getToken(!0,!0));for(b.stops=[e,f];!c.isSymbol(")");){e=this.parseColorStop(a,c);if(!e)return null;c=a.currentToken();if(!c.isSymbol(")")&&!c.isSymbol(","))return null;c.isSymbol(",")&&(c=a.getToken(!0,!0));b.stops.push(e)}return b}return null},parseBoxShadows:function(a){var c=new CSSParser;c._init();
c.mPreserveWS=!1;c.mPreserveComments=!1;c.mPreservedTokens=[];c.mScanner.init(a);for(var a=[],b=c.getToken(!0,!0),e="",f="0px",h="0px",g="0px",i="0px",j=!1;b.isNotNull();)if(b.isIdent("none"))a.push({none:!0}),b=c.getToken(!0,!0);else{b.isIdent("inset")&&(j=!0,b=c.getToken(!0,!0));if(b.isPercentage()||b.isDimensionOfUnit("cm")||b.isDimensionOfUnit("mm")||b.isDimensionOfUnit("in")||b.isDimensionOfUnit("pc")||b.isDimensionOfUnit("px")||b.isDimensionOfUnit("em")||b.isDimensionOfUnit("ex")||b.isDimensionOfUnit("pt"))b=
c.getToken(!0,!0);else return[];!j&&b.isIdent("inset")&&(j=!0,b=c.getToken(!0,!0));if(b.isPercentage()||b.isDimensionOfUnit("cm")||b.isDimensionOfUnit("mm")||b.isDimensionOfUnit("in")||b.isDimensionOfUnit("pc")||b.isDimensionOfUnit("px")||b.isDimensionOfUnit("em")||b.isDimensionOfUnit("ex")||b.isDimensionOfUnit("pt"))h=b.value,b=c.getToken(!0,!0);else return[];!j&&b.isIdent("inset")&&(j=!0,b=c.getToken(!0,!0));if(b.isPercentage()||b.isDimensionOfUnit("cm")||b.isDimensionOfUnit("mm")||b.isDimensionOfUnit("in")||
b.isDimensionOfUnit("pc")||b.isDimensionOfUnit("px")||b.isDimensionOfUnit("em")||b.isDimensionOfUnit("ex")||b.isDimensionOfUnit("pt"))f=b.value,b=c.getToken(!0,!0);!j&&b.isIdent("inset")&&(j=!0,b=c.getToken(!0,!0));if(b.isPercentage()||b.isDimensionOfUnit("cm")||b.isDimensionOfUnit("mm")||b.isDimensionOfUnit("in")||b.isDimensionOfUnit("pc")||b.isDimensionOfUnit("px")||b.isDimensionOfUnit("em")||b.isDimensionOfUnit("ex")||b.isDimensionOfUnit("pt"))i=b.value,b=c.getToken(!0,!0);!j&&b.isIdent("inset")&&
(j=!0,b=c.getToken(!0,!0));if(b.isFunction("rgb(")||b.isFunction("rgba(")||b.isFunction("hsl(")||b.isFunction("hsla(")||b.isSymbol("#")||b.isIdent())e=c.parseColor(b),b=c.getToken(!0,!0);!j&&b.isIdent("inset")&&(b=c.getToken(!0,!0));a.push({none:!1,color:e,offsetX:h,offsetY:g,blurRadius:f,spreadRadius:i});if(b.isSymbol(","))j=!1,e="",g=i=f="0px",b=c.getToken(!0,!0);else{if(b.isNotNull())return[];break}}return a},parseTextShadows:function(a){var c=new CSSParser;c._init();c.mPreserveWS=!1;c.mPreserveComments=
!1;c.mPreservedTokens=[];c.mScanner.init(a);for(var a=[],b=c.getToken(!0,!0),e="",f="0px",h="0px",g="0px";b.isNotNull();)if(b.isIdent("none"))a.push({none:!0}),b=c.getToken(!0,!0);else{if(b.isFunction("rgb(")||b.isFunction("rgba(")||b.isFunction("hsl(")||b.isFunction("hsla(")||b.isSymbol("#")||b.isIdent())e=c.parseColor(b),b=c.getToken(!0,!0);if(b.isPercentage()||b.isDimensionOfUnit("cm")||b.isDimensionOfUnit("mm")||b.isDimensionOfUnit("in")||b.isDimensionOfUnit("pc")||b.isDimensionOfUnit("px")||
b.isDimensionOfUnit("em")||b.isDimensionOfUnit("ex")||b.isDimensionOfUnit("pt"))h=b.value,b=c.getToken(!0,!0);else return[];if(b.isPercentage()||b.isDimensionOfUnit("cm")||b.isDimensionOfUnit("mm")||b.isDimensionOfUnit("in")||b.isDimensionOfUnit("pc")||b.isDimensionOfUnit("px")||b.isDimensionOfUnit("em")||b.isDimensionOfUnit("ex")||b.isDimensionOfUnit("pt"))g=b.value,b=c.getToken(!0,!0);else return[];if(b.isPercentage()||b.isDimensionOfUnit("cm")||b.isDimensionOfUnit("mm")||b.isDimensionOfUnit("in")||
b.isDimensionOfUnit("pc")||b.isDimensionOfUnit("px")||b.isDimensionOfUnit("em")||b.isDimensionOfUnit("ex")||b.isDimensionOfUnit("pt"))f=b.value,b=c.getToken(!0,!0);if(!e&&(b.isFunction("rgb(")||b.isFunction("rgba(")||b.isFunction("hsl(")||b.isFunction("hsla(")||b.isSymbol("#")||b.isIdent()))e=c.parseColor(b),b=c.getToken(!0,!0);a.push({none:!1,color:e,offsetX:h,offsetY:g,blurRadius:f});if(b.isSymbol(","))e="",f="0px",b=c.getToken(!0,!0);else{if(b.isNotNull())return[];break}}return a},parseBackgroundImages:function(a){var c=
new CSSParser;c._init();c.mPreserveWS=!1;c.mPreserveComments=!1;c.mPreservedTokens=[];c.mScanner.init(a);for(var a=[],b=c.getToken(!0,!0);b.isNotNull();){if(b.isFunction("url("))b=c.getToken(!0,!0),b=c.parseURL(b),a.push({type:"image",value:"url("+b}),b=c.getToken(!0,!0);else if(b.isFunction("-moz-linear-gradient(")||b.isFunction("-moz-radial-gradient(")||b.isFunction("-moz-repeating-linear-gradient(")||b.isFunction("-moz-repeating-radial-gradient("))b=this.parseGradient(c,b),a.push({type:b.isRadial?
"radial-gradient":"linear-gradient",value:b}),b=c.getToken(!0,!0);else return null;if(b.isSymbol(",")&&(b=c.getToken(!0,!0),!b.isNotNull()))return null}return a},serializeGradient:function(a){var c=a.isRadial?a.isRepeating?"-moz-repeating-radial-gradient(":"-moz-radial-gradient(":a.isRepeating?"-moz-repeating-linear-gradient(":"-moz-linear-gradient(";if(a.angle||a.position)c+=(a.angle?a.angle+" ":"")+(a.position?a.position:"")+", ";if(a.isRadial&&(a.shape||a.size))c+=(a.shape?a.shape:"")+" "+(a.size?
a.size:"")+", ";for(var b=0;b<a.stops.length;b++){var e=a.stops[b],c=c+(e.color+(e.position?" "+e.position:""));b!=a.stops.length-1&&(c+=", ")}return c+")"},parseBorderImage:function(a){var c=new CSSParser;c._init();c.mPreserveWS=!1;c.mPreserveComments=!1;c.mPreservedTokens=[];c.mScanner.init(a);var a={url:"",offsets:[],widths:[],sizes:[]},b=c.getToken(!0,!0);if(b.isFunction("url("))if(b=c.getToken(!0,!0),b=c.parseURL(b)){if(a.url=b.substr(0,b.length-1).trim(),'"'==a.url[0]&&'"'==a.url[a.url.length-
1]||"'"==a.url[0]&&"'"==a.url[a.url.length-1])a.url=a.url.substr(1,a.url.length-2)}else return null;else return null;b=c.getToken(!0,!0);if(b.isNumber()||b.isPercentage())a.offsets.push(b.value);else return null;var e;for(e=0;3>e;e++)if(b=c.getToken(!0,!0),b.isNumber()||b.isPercentage())a.offsets.push(b.value);else break;3==e&&(b=c.getToken(!0,!0));if(b.isSymbol("/")){b=c.getToken(!0,!0);if(b.isDimension()||b.isNumber("0")||b.isIdent()&&b.value in c.kBORDER_WIDTH_NAMES)a.widths.push(b.value);else return null;
for(e=0;3>e;e++)if(b=c.getToken(!0,!0),b.isDimension()||b.isNumber("0")||b.isIdent()&&b.value in c.kBORDER_WIDTH_NAMES)a.widths.push(b.value);else break;3==e&&(b=c.getToken(!0,!0))}for(e=0;2>e;e++){if(b.isIdent("stretch")||b.isIdent("repeat")||b.isIdent("round"))a.sizes.push(b.value);else return b.isNotNull()?null:a;b=c.getToken(!0,!0)}return!b.isNotNull()?a:null},parseMediaQuery:function(a){var c={width:!0,"min-width":!0,"max-width":!0,height:!0,"min-height":!0,"max-height":!0,"device-width":!0,
"min-device-width":!0,"max-device-width":!0,"device-height":!0,"min-device-height":!0,"max-device-height":!0,orientation:!0,"aspect-ratio":!0,"min-aspect-ratio":!0,"max-aspect-ratio":!0,"device-aspect-ratio":!0,"min-device-aspect-ratio":!0,"max-device-aspect-ratio":!0,color:!0,"min-color":!0,"max-color":!0,"color-index":!0,"min-color-index":!0,"max-color-index":!0,monochrome:!0,"min-monochrome":!0,"max-monochrome":!0,resolution:!0,"min-resolution":!0,"max-resolution":!0,scan:!0,grid:!0},b=new CSSParser;
b._init();b.mPreserveWS=!1;b.mPreserveComments=!1;b.mPreservedTokens=[];b.mScanner.init(a);var a={amplifier:"",medium:"",constraints:[]},e=b.getToken(!0,!0);if(e.isIdent("all")||e.isIdent("aural")||e.isIdent("braille")||e.isIdent("handheld")||e.isIdent("print")||e.isIdent("projection")||e.isIdent("screen")||e.isIdent("tty")||e.isIdent("tv"))a.medium=e.value,e=b.getToken(!0,!0);else if(e.isIdent("not")||e.isIdent("only"))if(a.amplifier=e.value,e=b.getToken(!0,!0),e.isIdent("all")||e.isIdent("aural")||
e.isIdent("braille")||e.isIdent("handheld")||e.isIdent("print")||e.isIdent("projection")||e.isIdent("screen")||e.isIdent("tty")||e.isIdent("tv"))a.medium=e.value,e=b.getToken(!0,!0);else return null;if(a.medium){if(!e.isNotNull())return a;if(e.isIdent("and"))e=b.getToken(!0,!0);else return null}for(;e.isSymbol("(");)if(e=b.getToken(!0,!0),e.isIdent()&&e.value in c){var f=e.value,e=b.getToken(!0,!0);if(e.isSymbol(":")){for(var e=b.getToken(!0,!0),h=[];!e.isSymbol(")");)h.push(e.value),e=b.getToken(!0,
!0);if(e.isSymbol(")"))if(a.constraints.push({constraint:f,value:h}),e=b.getToken(!0,!0),e.isNotNull())if(e.isIdent("and"))e=b.getToken(!0,!0);else return null;else break;else return null}else if(e.isSymbol(")"))if(a.constraints.push({constraint:f,value:null}),e=b.getToken(!0,!0),e.isNotNull())if(e.isIdent("and"))e=b.getToken(!0,!0);else return null;else break;else return null}else return null;return a}},CSS_ESCAPE="\\",IS_HEX_DIGIT=1,START_IDENT=2,IS_IDENT=4,IS_WHITESPACE=8,W=IS_WHITESPACE,I=IS_IDENT,
S=START_IDENT,SI=IS_IDENT|START_IDENT,XI=IS_IDENT|IS_HEX_DIGIT,XSI=IS_IDENT|START_IDENT|IS_HEX_DIGIT;function CSSScanner(a){this.init(a)}
CSSScanner.prototype={kLexTable:[0,0,0,0,0,0,0,0,0,W,W,0,W,W,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,W,0,0,0,0,0,0,0,0,0,0,0,0,I,0,0,XI,XI,XI,XI,XI,XI,XI,XI,XI,XI,0,0,0,0,0,0,0,XSI,XSI,XSI,XSI,XSI,XSI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,0,S,0,0,SI,0,XSI,XSI,XSI,XSI,XSI,XSI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,
SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI,SI],kHexValues:{"0":0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15},mString:"",mPos:0,mPreservedPos:[],init:function(a){this.mString=a;this.mPos=0;this.mPreservedPos=[]},getCurrentPos:function(){return this.mPos},getAlreadyScanned:function(){return this.mString.substr(0,
this.mPos)},preserveState:function(){this.mPreservedPos.push(this.mPos)},restoreState:function(){if(this.mPreservedPos.length)this.mPos=this.mPreservedPos.pop()},forgetState:function(){this.mPreservedPos.length&&this.mPreservedPos.pop()},read:function(){return this.mPos<this.mString.length?this.mString.charAt(this.mPos++):-1},peek:function(){return this.mPos<this.mString.length?this.mString.charAt(this.mPos):-1},isHexDigit:function(a){a=a.charCodeAt(0);return 256>a&&0!=(this.kLexTable[a]&IS_HEX_DIGIT)},
isIdentStart:function(a){a=a.charCodeAt(0);return 256<=a||0!=(this.kLexTable[a]&START_IDENT)},startsWithIdent:function(a,c){a.charCodeAt(0);return this.isIdentStart(a)||"-"==a&&this.isIdentStart(c)},isIdent:function(a){a=a.charCodeAt(0);return 256<=a||0!=(this.kLexTable[a]&IS_IDENT)},pushback:function(){this.mPos--},nextHexValue:function(){var a=this.read();if(-1==a||!this.isHexDigit(a))return new jscsspToken(jscsspToken.NULL_TYPE,null);for(var c=a,a=this.read();-1!=a&&this.isHexDigit(a);)c+=a,a=
this.read();-1!=a&&this.pushback();return new jscsspToken(jscsspToken.HEX_TYPE,c)},gatherEscape:function(){var a=this.peek();if(-1==a)return"";if(this.isHexDigit(a)){for(var c=0,b=0;6>b;b++)if(a=this.read(),this.isHexDigit(a))c=16*c+this.kHexValues[a.toLowerCase()];else{!this.isHexDigit(a)&&!this.isWhiteSpace(a)&&this.pushback();break}6==b&&(a=this.peek(),this.isWhiteSpace(a)&&this.read());return String.fromCharCode(c)}a=this.read();return"\n"!=a?a:""},gatherIdent:function(a){for(var c="",c=a==CSS_ESCAPE?
c+this.gatherEscape():c+a,a=this.read();-1!=a&&(this.isIdent(a)||a==CSS_ESCAPE);)c=a==CSS_ESCAPE?c+this.gatherEscape():c+a,a=this.read();-1!=a&&this.pushback();return c},parseIdent:function(a){a=this.gatherIdent(a);return"("==this.peek()?(a+=this.read(),new jscsspToken(jscsspToken.FUNCTION_TYPE,a)):new jscsspToken(jscsspToken.IDENT_TYPE,a)},isDigit:function(a){return"0"<=a&&"9">=a},parseComment:function(a){for(var c=a;-1!=(a=this.read());)if(c+=a,"*"==a){a=this.read();if(-1==a)break;if("/"==a){c+=
a;break}this.pushback()}return new jscsspToken(jscsspToken.COMMENT_TYPE,c)},parseNumber:function(a){for(var c=a,b=!1;-1!=(a=this.read());)if("."==a)if(b)break;else c+=a,b=!0;else if(this.isDigit(a))c+=a;else break;if(-1!=a&&this.startsWithIdent(a,this.peek()))return a=this.gatherIdent(a),new jscsspToken(jscsspToken.DIMENSION_TYPE,c+a,a);if("%"==a)return new jscsspToken(jscsspToken.PERCENTAGE_TYPE,c+"%");-1!=a&&this.pushback();return new jscsspToken(jscsspToken.NUMBER_TYPE,c)},parseString:function(a){for(var c=
a,b=a,e;-1!=(e=this.read());){if(e==a&&b!=CSS_ESCAPE){c+=e;break}else if(e==CSS_ESCAPE)if(e=this.peek(),-1==e)break;else"\n"==e||"\r"==e||"\u000c"==e?(d=e,e=this.read(),"\r"==d&&(e=this.peek(),"\n"==e&&(e=this.read()))):(c+=this.gatherEscape(),e=this.peek());else if("\n"==e||"\r"==e||"\u000c"==e)break;else c+=e;b=e}return new jscsspToken(jscsspToken.STRING_TYPE,c)},isWhiteSpace:function(a){a=a.charCodeAt(0);return 256>a&&0!=(this.kLexTable[a]&IS_WHITESPACE)},eatWhiteSpace:function(a){for(var c=a;-1!=
(a=this.read())&&this.isWhiteSpace(a);)c+=a;-1!=a&&this.pushback();return c},parseAtKeyword:function(a){return new jscsspToken(jscsspToken.ATRULE_TYPE,this.gatherIdent(a))},nextToken:function(){var a=this.read();if(-1==a)return new jscsspToken(jscsspToken.NULL_TYPE,null);if(this.startsWithIdent(a,this.peek()))return this.parseIdent(a);if("@"==a){var c=this.read();if(-1!=c){var b=this.peek();this.pushback();if(this.startsWithIdent(c,b))return this.parseAtKeyword(a)}}if("."==a||"+"==a||"-"==a){c=this.peek();
if(this.isDigit(c)||"."==c&&"."!=a&&(firstChar=this.read(),c=this.peek(),this.pushback(),this.isDigit(c)))return this.parseNumber(a)}if(this.isDigit(a))return this.parseNumber(a);if("'"==a||'"'==a)return this.parseString(a);if(this.isWhiteSpace(a))return a=this.eatWhiteSpace(a),new jscsspToken(jscsspToken.WHITESPACE_TYPE,a);if("|"==a||"~"==a||"^"==a||"$"==a||"*"==a)if(c=this.read(),"="==c)switch(a){case "~":return new jscsspToken(jscsspToken.INCLUDES_TYPE,"~=");case "|":return new jscsspToken(jscsspToken.DASHMATCH_TYPE,
"|=");case "^":return new jscsspToken(jscsspToken.BEGINSMATCH_TYPE,"^=");case "$":return new jscsspToken(jscsspToken.ENDSMATCH_TYPE,"$=");case "*":return new jscsspToken(jscsspToken.CONTAINSMATCH_TYPE,"*=")}else-1!=c&&this.pushback();return"/"==a&&"*"==this.peek()?this.parseComment(a):new jscsspToken(jscsspToken.SYMBOL_TYPE,a)}};
function CSSParser(a){this.mLookAhead=this.mToken=null;this.mScanner=new CSSScanner(a);this.mPreserveComments=this.mPreserveWS=!0;this.mPreservedTokens=[];this.mError=null}
CSSParser.prototype={_init:function(){this.mLookAhead=this.mToken=null},kINHERIT:"inherit",kBORDER_WIDTH_NAMES:{thin:!0,medium:!0,thick:!0},kBORDER_STYLE_NAMES:{none:!0,hidden:!0,dotted:!0,dashed:!0,solid:!0,"double":!0,groove:!0,ridge:!0,inset:!0,outset:!0},kCOLOR_NAMES:{transparent:!0,black:!0,silver:!0,gray:!0,white:!0,maroon:!0,red:!0,purple:!0,fuchsia:!0,green:!0,lime:!0,olive:!0,yellow:!0,navy:!0,blue:!0,teal:!0,aqua:!0,aliceblue:!0,antiquewhite:!0,aqua:!0,aquamarine:!0,azure:!0,beige:!0,bisque:!0,
black:!0,blanchedalmond:!0,blue:!0,blueviolet:!0,brown:!0,burlywood:!0,cadetblue:!0,chartreuse:!0,chocolate:!0,coral:!0,cornflowerblue:!0,cornsilk:!0,crimson:!0,cyan:!0,darkblue:!0,darkcyan:!0,darkgoldenrod:!0,darkgray:!0,darkgreen:!0,darkgrey:!0,darkkhaki:!0,darkmagenta:!0,darkolivegreen:!0,darkorange:!0,darkorchid:!0,darkred:!0,darksalmon:!0,darkseagreen:!0,darkslateblue:!0,darkslategray:!0,darkslategrey:!0,darkturquoise:!0,darkviolet:!0,deeppink:!0,deepskyblue:!0,dimgray:!0,dimgrey:!0,dodgerblue:!0,
firebrick:!0,floralwhite:!0,forestgreen:!0,fuchsia:!0,gainsboro:!0,ghostwhite:!0,gold:!0,goldenrod:!0,gray:!0,green:!0,greenyellow:!0,grey:!0,honeydew:!0,hotpink:!0,indianred:!0,indigo:!0,ivory:!0,khaki:!0,lavender:!0,lavenderblush:!0,lawngreen:!0,lemonchiffon:!0,lightblue:!0,lightcoral:!0,lightcyan:!0,lightgoldenrodyellow:!0,lightgray:!0,lightgreen:!0,lightgrey:!0,lightpink:!0,lightsalmon:!0,lightseagreen:!0,lightskyblue:!0,lightslategray:!0,lightslategrey:!0,lightsteelblue:!0,lightyellow:!0,lime:!0,
limegreen:!0,linen:!0,magenta:!0,maroon:!0,mediumaquamarine:!0,mediumblue:!0,mediumorchid:!0,mediumpurple:!0,mediumseagreen:!0,mediumslateblue:!0,mediumspringgreen:!0,mediumturquoise:!0,mediumvioletred:!0,midnightblue:!0,mintcream:!0,mistyrose:!0,moccasin:!0,navajowhite:!0,navy:!0,oldlace:!0,olive:!0,olivedrab:!0,orange:!0,orangered:!0,orchid:!0,palegoldenrod:!0,palegreen:!0,paleturquoise:!0,palevioletred:!0,papayawhip:!0,peachpuff:!0,peru:!0,pink:!0,plum:!0,powderblue:!0,purple:!0,red:!0,rosybrown:!0,
royalblue:!0,saddlebrown:!0,salmon:!0,sandybrown:!0,seagreen:!0,seashell:!0,sienna:!0,silver:!0,skyblue:!0,slateblue:!0,slategray:!0,slategrey:!0,snow:!0,springgreen:!0,steelblue:!0,tan:!0,teal:!0,thistle:!0,tomato:!0,turquoise:!0,violet:!0,wheat:!0,white:!0,whitesmoke:!0,yellow:!0,yellowgreen:!0,activeborder:!0,activecaption:!0,appworkspace:!0,background:!0,buttonface:!0,buttonhighlight:!0,buttonshadow:!0,buttontext:!0,captiontext:!0,graytext:!0,highlight:!0,highlighttext:!0,inactiveborder:!0,inactivecaption:!0,
inactivecaptiontext:!0,infobackground:!0,infotext:!0,menu:!0,menutext:!0,scrollbar:!0,threeddarkshadow:!0,threedface:!0,threedhighlight:!0,threedlightshadow:!0,threedshadow:!0,window:!0,windowframe:!0,windowtext:!0},kLIST_STYLE_TYPE_NAMES:{decimal:!0,"decimal-leading-zero":!0,"lower-roman":!0,"upper-roman":!0,georgian:!0,armenian:!0,"lower-latin":!0,"lower-alpha":!0,"upper-latin":!0,"upper-alpha":!0,"lower-greek":!0,disc:!0,circle:!0,square:!0,none:!0,box:!0,check:!0,diamond:!0,hyphen:!0,"lower-armenian":!0,
"cjk-ideographic":!0,"ethiopic-numeric":!0,hebrew:!0,"japanese-formal":!0,"japanese-informal":!0,"simp-chinese-formal":!0,"simp-chinese-informal":!0,syriac:!0,tamil:!0,"trad-chinese-formal":!0,"trad-chinese-informal":!0,"upper-armenian":!0,"arabic-indic":!0,binary:!0,bengali:!0,cambodian:!0,khmer:!0,devanagari:!0,gujarati:!0,gurmukhi:!0,kannada:!0,"lower-hexadecimal":!0,lao:!0,malayalam:!0,mongolian:!0,myanmar:!0,octal:!0,oriya:!0,persian:!0,urdu:!0,telugu:!0,tibetan:!0,"upper-hexadecimal":!0,afar:!0,
"ethiopic-halehame-aa-et":!0,"ethiopic-halehame-am-et":!0,"amharic-abegede":!0,"ehiopic-abegede-am-et":!0,"cjk-earthly-branch":!0,"cjk-heavenly-stem":!0,ethiopic:!0,"ethiopic-abegede":!0,"ethiopic-abegede-gez":!0,"hangul-consonant":!0,hangul:!0,"hiragana-iroha":!0,hiragana:!0,"katakana-iroha":!0,katakana:!0,"lower-norwegian":!0,oromo:!0,"ethiopic-halehame-om-et":!0,sidama:!0,"ethiopic-halehame-sid-et":!0,somali:!0,"ethiopic-halehame-so-et":!0,tigre:!0,"ethiopic-halehame-tig":!0,"tigrinya-er-abegede":!0,
"ethiopic-abegede-ti-er":!0,"tigrinya-et":!0,"ethiopic-halehame-ti-et":!0,"upper-greek":!0,asterisks:!0,footnotes:!0,"circled-decimal":!0,"circled-lower-latin":!0,"circled-upper-latin":!0,"dotted-decimal":!0,"double-circled-decimal":!0,"filled-circled-decimal":!0,"parenthesised-decimal":!0,"parenthesised-lower-latin":!0},reportError:function(a){this.mError=a},consumeError:function(){var a=this.mError;this.mError=null;return a},currentToken:function(){return this.mToken},getHexValue:function(){return this.mToken=
this.mScanner.nextHexValue()},getToken:function(a,c){if(this.mLookAhead)return this.mToken=this.mLookAhead,this.mLookAhead=null,this.mToken;for(this.mToken=this.mScanner.nextToken();this.mToken&&(a&&this.mToken.isWhiteSpace()||c&&this.mToken.isComment());)this.mToken=this.mScanner.nextToken();return this.mToken},lookAhead:function(a,c){var b=this.mToken;this.mScanner.preserveState();var e=this.getToken(a,c);this.mScanner.restoreState();this.mToken=b;return e},ungetToken:function(){this.mLookAhead=
this.mToken},addUnknownAtRule:function(a,c){for(var b=CountLF(this.mScanner.getAlreadyScanned()),e=[],f=this.getToken(!1,!1);f.isNotNull();){c+=f.value;if(f.isSymbol(";")&&!e.length)break;else if(f.isSymbol("{")||f.isSymbol("(")||f.isSymbol("[")||"function"==f.type)e.push(f.isFunction()?"(":f.value);else if((f.isSymbol("}")||f.isSymbol(")")||f.isSymbol("]"))&&e.length){var h=e[e.length-1];if(f.isSymbol("}")&&"{"==h||f.isSymbol(")")&&"("==h||f.isSymbol("]")&&"["==h)if(e.pop(),!e.length&&f.isSymbol("}"))break}f=
this.getToken(!1,!1)}this.addUnknownRule(a,c,b)},addUnknownRule:function(a,c,b){var e=this.consumeError(),e=new jscsspErrorRule(e);e.currentLine=b;e.parsedCssText=c;e.parentStyleSheet=a;a.cssRules.push(e)},addWhitespace:function(a,c){var b=new jscsspWhitespace;b.parsedCssText=c;b.parentStyleSheet=a;a.cssRules.push(b)},addComment:function(a,c){var b=new jscsspComment;b.parsedCssText=c;b.parentStyleSheet=a;a.cssRules.push(b)},parseCharsetRule:function(a,c){var b=a.value,e=this.getToken(!1,!1),b=b+e.value;
if(e.isWhiteSpace(" "))if(e=this.getToken(!1,!1),b+=e.value,e.isString()){var f=e.value,e=this.getToken(!1,!1),b=b+e.value;if(e.isSymbol(";"))return e=new jscsspCharsetRule,e.encoding=f,e.parsedCssText=b,e.parentStyleSheet=c,c.cssRules.push(e),!0;this.reportError(kCHARSET_RULE_MISSING_SEMICOLON)}else this.reportError(kCHARSET_RULE_CHARSET_IS_STRING);else this.reportError(kCHARSET_RULE_MISSING_WS);this.addUnknownAtRule(c,b);return!1},parseImportRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned()),
e=a.value;this.preserveState();var f=this.getToken(!0,!0),h=[],g="";if(f.isString())g=f.value,e+=" "+g;else if(f.isFunction("url(")){if(f=this.getToken(!0,!0),f=this.parseURL(f))g="url("+f,e+=" "+g}else this.reportError(kIMPORT_RULE_MISSING_URL);if(g){for(f=this.getToken(!0,!0);f.isIdent();){e+=" "+f.value;h.push(f.value);f=this.getToken(!0,!0);if(!f)break;if(f.isSymbol(","))e+=",";else{f.isSymbol(";");break}f=this.getToken(!0,!0)}h.length||h.push("all");if(f.isSymbol(";"))return e+=";",this.forgetState(),
f=new jscsspImportRule,f.currentLine=b,f.parsedCssText=e,f.href=g,f.media=h,f.parentStyleSheet=c,c.cssRules.push(f),!0}this.restoreState();this.addUnknownAtRule(c,"@import");return!1},parseVariablesRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned()),e=a.value,f=[],h=!1;this.preserveState();for(var a=this.getToken(!0,!0),g=[],i=!1;a.isNotNull();){if(a.isIdent())if(i=!0,e+=" "+a.value,g.push(a.value),a=this.getToken(!0,!0),a.isSymbol(","))e+=",";else if(a.isSymbol("{"))this.ungetToken();
else{a.type=jscsspToken.NULL_TYPE;break}else if(a.isSymbol("{"))break;else if(i){a.type=jscsspToken.NULL_TYPE;break}a=this.getToken(!0,!0)}if(a.isSymbol("{")){e+=" {";for(a=this.getToken(!0,!0);;){if(!a.isNotNull()){h=!0;break}if(a.isSymbol("}")){e+="}";h=!0;break}else i=this.parseDeclaration(a,f,!0,!1,c),e+=(i&&f.length?" ":"")+i;a=this.getToken(!0,!1)}}if(h)return this.forgetState(),h=new jscsspVariablesRule,h.currentLine=b,h.parsedCssText=e,h.declarations=f,h.media=g,h.parentStyleSheet=c,c.cssRules.push(h),
!0;this.restoreState();return!1},parseNamespaceRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned()),e=a.value;this.preserveState();var f=this.getToken(!0,!0);if(f.isNotNull()){var h="",g="";if(f.isIdent())h=f.value,e+=" "+h,f=this.getToken(!0,!0);if(f){var i=!1;if(f.isString())i=!0,g=f.value,e+=" "+g;else if(f.isFunction("url(")&&(f=this.getToken(!0,!0),f=this.parseURL(f)))g+="url("+f,i=!0,e+=" "+f}if(i&&(f=this.getToken(!0,!0),f.isSymbol(";")))return e+=";",this.forgetState(),i=new jscsspNamespaceRule,
i.currentLine=b,i.parsedCssText=e,i.prefix=h,i.url=g,i.parentStyleSheet=c,c.cssRules.push(i),!0}this.restoreState();this.addUnknownAtRule(c,"@namespace");return!1},parseFontFaceRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned()),e=a.value,f=!1,h=[];this.preserveState();var g=this.getToken(!0,!0);if(g.isNotNull()&&g.isSymbol("{")){e+=" "+g.value;for(g=this.getToken(!0,!1);;){if(g.isSymbol("}")){e+="}";f=!0;break}else g=this.parseDeclaration(g,h,!1,!1,c),e+=(g&&h.length?" ":"")+g;g=
this.getToken(!0,!1)}}if(f)return this.forgetState(),f=new jscsspFontFaceRule,f.currentLine=b,f.parsedCssText=e,f.descriptors=h,f.parentStyleSheet=c,c.cssRules.push(f),!0;this.restoreState();return!1},parsePageRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned()),e=a.value,f=!1,h=[];this.preserveState();var g=this.getToken(!0,!0),i="";if(g.isSymbol(":")||g.isIdent())g.isSymbol(":")&&(i=":",g=this.getToken(!1,!1)),g.isIdent()&&(i+=g.value,e+=" "+i,g=this.getToken(!0,!0));if(g.isNotNull()&&
g.isSymbol("{")){e+=" "+g.value;for(g=this.getToken(!0,!1);;){if(g.isSymbol("}")){e+="}";f=!0;break}else g=this.parseDeclaration(g,h,!0,!0,c),e+=(g&&h.length?" ":"")+g;g=this.getToken(!0,!1)}}if(f)return this.forgetState(),f=new jscsspPageRule,f.currentLine=b,f.parsedCssText=e,f.pageSelector=i,f.declarations=h,f.parentStyleSheet=c,c.cssRules.push(f),!0;this.restoreState();return!1},parseDefaultPropertyValue:function(a,c,b,e,f){for(var b="",h=[],g=[];a.isNotNull();){if((a.isSymbol(";")||a.isSymbol("}")||
a.isSymbol("!"))&&!h.length){a.isSymbol("}")&&this.ungetToken();break}if(a.isIdent(this.kINHERIT)){if(g.length)return"";var b=this.kINHERIT,i=new jscsspVariable(kJscsspINHERIT_VALUE,f);g.push(i);this.getToken(!0,!0);break}else if(a.isSymbol("{")||a.isSymbol("(")||a.isSymbol("["))h.push(a.value);else if((a.isSymbol("}")||a.isSymbol("]"))&&h.length)i=h[h.length-1],(a.isSymbol("}")&&"{"==i||a.isSymbol(")")&&"("==i||a.isSymbol("]")&&"["==i)&&h.pop();if(a.isFunction())if(a.isFunction("var("))if(a=this.getToken(!0,
!0),a.isIdent()){var j=a.value,a=this.getToken(!0,!0);if(a.isSymbol(")"))i=new jscsspVariable(kJscsspVARIABLE_VALUE,f),b+="var("+j+")",i.name=j,g.push(i);else return""}else return"";else if(j=a.value,a=this.getToken(!1,!0),a=this.parseFunctionArgument(a))b+=j+a,i=new jscsspVariable(kJscsspPRIMITIVE_VALUE,f),i.value=j+a,g.push(i);else return"";else if(a.isSymbol("#"))if(a=this.parseColor(a))b+=a,i=new jscsspVariable(kJscsspPRIMITIVE_VALUE,f),i.value=a,g.push(i);else return"";else{if(!a.isWhiteSpace()&&
!a.isSymbol(","))i=new jscsspVariable(kJscsspPRIMITIVE_VALUE,f),i.value=a.value,g.push(i);b+=a.value}a=this.getToken(!1,!0)}return g.length&&b?(this.forgetState(),c.push(this._createJscsspDeclarationFromValuesArray(e,g,b)),b):""},parseMarginOrPaddingShorthand:function(a,c,b,e){for(var f=null,h=null,g=null,i=null,j=[];a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!j.length&&a.isIdent(this.kINHERIT)){j.push(a.value);this.getToken(!0,
!0);break}else if(a.isDimension()||a.isNumber("0")||a.isPercentage()||a.isIdent("auto"))j.push(a.value);else return"";a=this.getToken(!0,!0)}switch(j.length){case 1:i=g=h=f=j[0];break;case 2:h=f=j[0];i=g=j[1];break;case 3:f=j[0];i=g=j[1];h=j[2];break;case 4:f=j[0];i=j[1];h=j[2];g=j[3];break;default:return""}this.forgetState();c.push(this._createJscsspDeclarationFromValue(e+"-top",f));c.push(this._createJscsspDeclarationFromValue(e+"-right",i));c.push(this._createJscsspDeclarationFromValue(e+"-bottom",
h));c.push(this._createJscsspDeclarationFromValue(e+"-left",g));return f+" "+i+" "+h+" "+g},parseBorderColorShorthand:function(a,c,b){for(var e=null,f=null,h=null,g=null,i=[];a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!i.length&&a.isIdent(this.kINHERIT)){i.push(a.value);this.getToken(!0,!0);break}else if(a=this.parseColor(a))i.push(a);else return"";a=this.getToken(!0,!0)}switch(i.length){case 1:g=h=f=e=i[0];break;case 2:f=
e=i[0];g=h=i[1];break;case 3:e=i[0];g=h=i[1];f=i[2];break;case 4:e=i[0];g=i[1];f=i[2];h=i[3];break;default:return""}this.forgetState();c.push(this._createJscsspDeclarationFromValue("border-top-color",e));c.push(this._createJscsspDeclarationFromValue("border-right-color",g));c.push(this._createJscsspDeclarationFromValue("border-bottom-color",f));c.push(this._createJscsspDeclarationFromValue("border-left-color",h));return e+" "+g+" "+f+" "+h},parseCueShorthand:function(a,c,b){var f;for(var e=c="",e=
[],e=[];a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!e.length&&a.isIdent(this.kINHERIT))e.push(a.value);else if(a.isIdent("none"))e.push(a.value);else if(a.isFunction("url("))if(a=this.getToken(!0,!0),a=this.parseURL(a))e.push("url("+a);else return"";else return"";a=this.getToken(!0,!0)}switch(e.length){case 1:f=c=e[0],e=f;break;case 2:c=e[0];e=e[1];break;default:return""}this.forgetState();aDecl.push(this._createJscsspDeclarationFromValue("cue-before",
c));aDecl.push(this._createJscsspDeclarationFromValue("cue-after",e));return c+" "+e},parsePauseShorthand:function(a,c,b){var f;for(var e=c="",e=[],e=[];a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!e.length&&a.isIdent(this.kINHERIT))e.push(a.value);else if(a.isDimensionOfUnit("ms")||a.isDimensionOfUnit("s")||a.isPercentage()||a.isNumber("0"))e.push(a.value);else return"";a=this.getToken(!0,!0)}switch(e.length){case 1:f=
c=e[0],e=f;break;case 2:c=e[0];e=e[1];break;default:return""}this.forgetState();aDecl.push(this._createJscsspDeclarationFromValue("pause-before",c));aDecl.push(this._createJscsspDeclarationFromValue("pause-after",e));return c+" "+e},parseBorderWidthShorthand:function(a,c,b){for(var e=null,f=null,h=null,g=null,i=[];a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!i.length&&a.isIdent(this.kINHERIT))i.push(a.value);else if(a.isDimension()||
a.isNumber("0")||a.isIdent()&&a.value in this.kBORDER_WIDTH_NAMES)i.push(a.value);else return"";a=this.getToken(!0,!0)}switch(i.length){case 1:g=h=f=e=i[0];break;case 2:f=e=i[0];g=h=i[1];break;case 3:e=i[0];g=h=i[1];f=i[2];break;case 4:e=i[0];g=i[1];f=i[2];h=i[3];break;default:return""}this.forgetState();c.push(this._createJscsspDeclarationFromValue("border-top-width",e));c.push(this._createJscsspDeclarationFromValue("border-right-width",g));c.push(this._createJscsspDeclarationFromValue("border-bottom-width",
f));c.push(this._createJscsspDeclarationFromValue("border-left-width",h));return e+" "+g+" "+f+" "+h},parseBorderStyleShorthand:function(a,c,b){for(var e=null,f=null,h=null,g=null,i=[];a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!i.length&&a.isIdent(this.kINHERIT))i.push(a.value);else if(a.isIdent()&&a.value in this.kBORDER_STYLE_NAMES)i.push(a.value);else return"";a=this.getToken(!0,!0)}switch(i.length){case 1:g=h=f=e=
i[0];break;case 2:f=e=i[0];g=h=i[1];break;case 3:e=i[0];g=h=i[1];f=i[2];break;case 4:e=i[0];g=i[1];f=i[2];h=i[3];break;default:return""}this.forgetState();c.push(this._createJscsspDeclarationFromValue("border-top-style",e));c.push(this._createJscsspDeclarationFromValue("border-right-style",g));c.push(this._createJscsspDeclarationFromValue("border-bottom-style",f));c.push(this._createJscsspDeclarationFromValue("border-left-style",h));return e+" "+g+" "+f+" "+h},parseBorderEdgeOrOutlineShorthand:function(a,
c,b,e){function f(a,b,c,e,f,g){b.push(a._createJscsspDeclarationFromValue(c+"-width",e));b.push(a._createJscsspDeclarationFromValue(c+"-style",f));b.push(a._createJscsspDeclarationFromValue(c+"-color",g))}for(var h=null,g=null,i=null;a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!h&&!g&&!i&&a.isIdent(this.kINHERIT))i=g=h=this.kINHERIT;else if(!h&&(a.isDimension()||a.isIdent()&&a.value in this.kBORDER_WIDTH_NAMES||a.isNumber("0")))h=
a.value;else if(!g&&a.isIdent()&&a.value in this.kBORDER_STYLE_NAMES)g=a.value;else if(a="outline"==e&&a.isIdent("invert")?"invert":this.parseColor(a),!i&&a)i=a;else return"";a=this.getToken(!0,!0)}this.forgetState();h=h?h:"medium";g=g?g:"none";i=i?i:"-moz-initial";"border"==e?(f(this,c,"border-top",h,g,i),f(this,c,"border-right",h,g,i),f(this,c,"border-bottom",h,g,i),f(this,c,"border-left",h,g,i)):f(this,c,e,h,g,i);return h+" "+g+" "+i},parseBackgroundShorthand:function(a,c,b){for(var e={left:!0,
right:!0},f={top:!0,bottom:!0},h={left:!0,right:!0,top:!0,bottom:!0,center:!0},g=null,i=null,j=null,k=null,l=null;a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!g&&!i&&!j&&!k&&!l&&a.isIdent(this.kINHERIT))l=k=j=i=g=this.kINHERIT;else if(!j&&(a.isIdent("scroll")||a.isIdent("fixed")))j=a.value;else if(!l&&(a.isIdent()&&a.value in h||a.isDimension()||a.isNumber("0")||a.isPercentage()))if(l=a.value,a=this.getToken(!0,!0),a.isDimension()||
a.isNumber("0")||a.isPercentage())l+=" "+a.value;else if(a.isIdent()&&a.value in h){if(l in e&&a.value in e||l in f&&a.value in f)return"";l+=" "+a.value}else this.ungetToken(),l+=" center";else if(!i&&(a.isIdent("repeat")||a.isIdent("repeat-x")||a.isIdent("repeat-y")||a.isIdent("no-repeat")))i=a.value;else if(!k&&(a.isFunction("url(")||a.isIdent("none"))){if(k=a.value,a.isFunction("url("))if(a=this.getToken(!0,!0),a=this.parseURL(a))k+=a;else return""}else if(!k&&(a.isFunction("-moz-linear-gradient(")||
a.isFunction("-moz-radial-gradient(")||a.isFunction("-moz-repeating-linear-gradient(")||a.isFunction("-moz-repeating-radial-gradient(")))if(k=CssInspector.parseGradient(this,a))k=CssInspector.serializeGradient(k);else return"";else if(a=this.parseColor(a),!g&&a)g=a;else return"";a=this.getToken(!0,!0)}this.forgetState();g=g?g:"transparent";k=k?k:"none";i=i?i:"repeat";j=j?j:"scroll";l=l?l:"top left";c.push(this._createJscsspDeclarationFromValue("background-color",g));c.push(this._createJscsspDeclarationFromValue("background-image",
k));c.push(this._createJscsspDeclarationFromValue("background-repeat",i));c.push(this._createJscsspDeclarationFromValue("background-attachment",j));c.push(this._createJscsspDeclarationFromValue("background-position",l));return g+" "+k+" "+i+" "+j+" "+l},parseListStyleShorthand:function(a,c,b){for(var e={inside:!0,outside:!0},f=null,h=null,g=null;a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!f&&!h&&!g&&a.isIdent(this.kINHERIT))g=
h=f=this.kINHERIT;else if(!f&&a.isIdent()&&a.value in this.kLIST_STYLE_TYPE_NAMES)f=a.value;else if(!h&&a.isIdent()&&a.value in e)h=a.value;else if(!g&&a.isFunction("url"))if(a=this.getToken(!0,!0),a=this.parseURL(a))g="url("+a;else return"";else if(!a.isIdent("none"))return"";a=this.getToken(!0,!0)}this.forgetState();f=f?f:"none";g=g?g:"none";h=h?h:"outside";c.push(this._createJscsspDeclarationFromValue("list-style-type",f));c.push(this._createJscsspDeclarationFromValue("list-style-position",h));
c.push(this._createJscsspDeclarationFromValue("list-style-image",g));return f+" "+h+" "+g},parseFontShorthand:function(a,c,b){for(var e={italic:!0,oblique:!0},f={"small-caps":!0},h={bold:!0,bolder:!0,lighter:!0,100:!0,200:!0,300:!0,400:!0,500:!0,600:!0,700:!0,800:!0,900:!0},g={"xx-small":!0,"x-small":!0,small:!0,medium:!0,large:!0,"x-large":!0,"xx-large":!0,larger:!0,smaller:!0},i={caption:!0,icon:!0,menu:!0,"message-box":!0,"small-caption":!0,"status-bar":!0},j={serif:!0,"sans-serif":!0,cursive:!0,
fantasy:!0,monospace:!0},k=null,l=null,n=null,o=null,p=null,m="",r=null,s=[],t=0;a.isNotNull();){if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){a.isSymbol("}")&&this.ungetToken();break}else if(!k&&!l&&!n&&!o&&!p&&!m&&!r&&a.isIdent(this.kINHERIT))r=m=p=o=n=l=k=this.kINHERIT;else if(!r&&a.isIdent()&&a.value in i){r=a.value;break}else if(!k&&a.isIdent()&&a.value in e)k=a.value;else if(!l&&a.isIdent()&&a.value in f)l=a.value;else if(!n&&(a.isIdent()||a.isNumber())&&a.value in h)n=a.value;else if(!o&&
(a.isIdent()&&a.value in g||a.isDimension()||a.isPercentage()))if(o=a.value,a=this.getToken(!1,!1),a.isSymbol("/"))if(a=this.getToken(!1,!1),!p&&(a.isDimension()||a.isNumber()||a.isPercentage()))p=a.value;else return"";else this.ungetToken();else if(a.isIdent("normal")){if(t++,3<t)return""}else if(!m&&(a.isString()||a.isIdent()))for(var q=!1;;){if(a.isNotNull())if(a.isSymbol(";")||b&&a.isSymbol("!")||a.isSymbol("}")){this.ungetToken();break}else if(a.isIdent()&&a.value in j){q=new jscsspVariable(kJscsspPRIMITIVE_VALUE,
null);q.value=a.value;s.push(q);m+=a.value;break}else if(a.isString()||a.isIdent())q=new jscsspVariable(kJscsspPRIMITIVE_VALUE,null),q.value=a.value,s.push(q),m+=a.value,q=!1;else if(!q&&a.isSymbol(","))m+=", ",q=!0;else return"";else break;a=this.getToken(!0,!0)}else return"";a=this.getToken(!0,!0)}this.forgetState();if(r)return c.push(this._createJscsspDeclarationFromValue("font",r)),r;k=k?k:"normal";l=l?l:"normal";n=n?n:"normal";o=o?o:"medium";p=p?p:"normal";m=m?m:"-moz-initial";c.push(this._createJscsspDeclarationFromValue("font-style",
k));c.push(this._createJscsspDeclarationFromValue("font-variant",l));c.push(this._createJscsspDeclarationFromValue("font-weight",n));c.push(this._createJscsspDeclarationFromValue("font-size",o));c.push(this._createJscsspDeclarationFromValue("line-height",p));c.push(this._createJscsspDeclarationFromValuesArray("font-family",s,m));return k+" "+l+" "+n+" "+o+"/"+p+" "+m},_createJscsspDeclaration:function(a,c){var b=new jscsspDeclaration;b.property=a;b.value=this.trim11(c);b.parsedCssText=a+": "+c+";";
return b},_createJscsspDeclarationFromValue:function(a,c){var b=new jscsspDeclaration;b.property=a;var e=new jscsspVariable(kJscsspPRIMITIVE_VALUE,null);e.value=c;b.values=[e];b.valueText=c;b.parsedCssText=a+": "+c+";";return b},_createJscsspDeclarationFromValuesArray:function(a,c,b){var e=new jscsspDeclaration;e.property=a;e.values=c;e.valueText=b;e.parsedCssText=a+": "+b+";";return e},parseURL:function(a){var c="";if(a.isString())c+=a.value,a=this.getToken(!0,!0);else for(;;){if(!a.isNotNull())return this.reportError(kURL_EOF),
"";if(a.isWhiteSpace()&&(nextToken=this.lookAhead(!0,!0),!nextToken.isSymbol(")"))){this.reportError(kURL_WS_INSIDE);a=this.currentToken();break}if(a.isSymbol(")"))break;c+=a.value;a=this.getToken(!1,!1)}return a.isSymbol(")")?c+")":""},parseFunctionArgument:function(a){var c="";if(a.isString())c+=a.value,a=this.getToken(!0,!0);else for(var b=1;;){if(!a.isNotNull())return"";(a.isFunction()||a.isSymbol("("))&&b++;if(a.isSymbol(")")&&(b--,!b))break;c+=a.value;a=this.getToken(!1,!1)}return a.isSymbol(")")?
c+")":""},parseColor:function(a){var c="";if(a.isFunction("rgb(")||a.isFunction("rgba(")){var c=a.value,b=a.isFunction("rgba("),a=this.getToken(!0,!0);if(!a.isNumber()&&!a.isPercentage())return"";c+=a.value;a=this.getToken(!0,!0);if(!a.isSymbol(","))return"";c+=", ";a=this.getToken(!0,!0);if(!a.isNumber()&&!a.isPercentage())return"";c+=a.value;a=this.getToken(!0,!0);if(!a.isSymbol(","))return"";c+=", ";a=this.getToken(!0,!0);if(!a.isNumber()&&!a.isPercentage())return"";c+=a.value;if(b){a=this.getToken(!0,
!0);if(!a.isSymbol(","))return"";c+=", ";a=this.getToken(!0,!0);if(!a.isNumber())return"";c+=a.value}a=this.getToken(!0,!0);if(!a.isSymbol(")"))return"";c+=a.value}else if(a.isFunction("hsl(")||a.isFunction("hsla(")){c=a.value;b=a.isFunction("hsla(");a=this.getToken(!0,!0);if(!a.isNumber())return"";c+=a.value;a=this.getToken(!0,!0);if(!a.isSymbol(","))return"";c+=", ";a=this.getToken(!0,!0);if(!a.isPercentage())return"";c+=a.value;a=this.getToken(!0,!0);if(!a.isSymbol(","))return"";c+=", ";a=this.getToken(!0,
!0);if(!a.isPercentage())return"";c+=a.value;if(b){a=this.getToken(!0,!0);if(!a.isSymbol(","))return"";c+=", ";a=this.getToken(!0,!0);if(!a.isNumber())return"";c+=a.value}a=this.getToken(!0,!0);if(!a.isSymbol(")"))return"";c+=a.value}else if(a.isIdent()&&a.value in this.kCOLOR_NAMES)c=a.value;else if(a.isSymbol("#")){a=this.getHexValue();if(!a.isHex())return"";c=a.value.length;if(3!=c&&6!=c||a.value.match(/[a-fA-F0-9]/g).length!=c)return"";c="#"+a.value}return c},parseDeclaration:function(a,c,b,e,
f){this.preserveState();var h=[];if(a.isIdent()){if(h=a.value.toLowerCase(),a=this.getToken(!0,!0),a.isSymbol(":")){var a=this.getToken(!0,!0),g="",i=[];if(e)switch(h){case "background":g=this.parseBackgroundShorthand(a,i,b);break;case "margin":case "padding":g=this.parseMarginOrPaddingShorthand(a,i,b,h);break;case "border-color":g=this.parseBorderColorShorthand(a,i,b);break;case "border-style":g=this.parseBorderStyleShorthand(a,i,b);break;case "border-width":g=this.parseBorderWidthShorthand(a,i,
b);break;case "border-top":case "border-right":case "border-bottom":case "border-left":case "border":case "outline":g=this.parseBorderEdgeOrOutlineShorthand(a,i,b,h);break;case "cue":g=this.parseCueShorthand(a,i,b);break;case "pause":g=this.parsePauseShorthand(a,i,b);break;case "font":g=this.parseFontShorthand(a,i,b);break;case "list-style":g=this.parseListStyleShorthand(a,i,b);break;default:g=this.parseDefaultPropertyValue(a,i,b,h,f)}else g=this.parseDefaultPropertyValue(a,i,b,h,f);a=this.currentToken();
if(g){b=!1;if(a.isSymbol("!"))if(a=this.getToken(!0,!0),a.isIdent("important"))if(b=!0,a=this.getToken(!0,!0),a.isSymbol(";")||a.isSymbol("}"))a.isSymbol("}")&&this.ungetToken();else return"";else return"";else if(a.isNotNull()&&!a.isSymbol(";")&&!a.isSymbol("}"))return"";for(a=0;a<i.length;a++)i[a].priority=b,c.push(i[a]);return h+": "+g+";"}}}else if(a.isComment()){if(this.mPreserveComments)this.forgetState(),b=new jscsspComment,b.parsedCssText=a.value,c.push(b);return a.value}this.restoreState();
h=[];for(a=this.getToken(!1,!1);a.isNotNull();){if((a.isSymbol(";")||a.isSymbol("}"))&&!h.length){a.isSymbol("}")&&this.ungetToken();break}else if(a.isSymbol("{")||a.isSymbol("(")||a.isSymbol("[")||a.isFunction())h.push(a.isFunction()?"(":a.value);else if((a.isSymbol("}")||a.isSymbol(")")||a.isSymbol("]"))&&h.length)c=h[h.length-1],(a.isSymbol("}")&&"{"==c||a.isSymbol(")")&&"("==c||a.isSymbol("]")&&"["==c)&&h.pop();a=this.getToken(!1,!1)}return""},parseKeyframesRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned()),
e=a.value,f=!1,h=new jscsspKeyframesRule;h.currentLine=b;this.preserveState();for(var g=this.getToken(!0,!0),i=!1;g.isNotNull();){if(g.isIdent())if(i=!0,e+=" "+g.value,h.name=g.value,g=this.getToken(!0,!0),g.isSymbol("{"))this.ungetToken();else{g.type=jscsspToken.NULL_TYPE;break}else{if(g.isSymbol("{")){if(!i)g.type=jscsspToken.NULL_TYPE}else g.type=jscsspToken.NULL_TYPE;break}g=this.getToken(!0,!0)}if(g.isSymbol("{")&&h.name){e+=" { ";for(g=this.getToken(!0,!1);g.isNotNull();){if(g.isComment()&&
this.mPreserveComments)e+=" "+g.value,i=new jscsspComment,i.parsedCssText=g.value,h.cssRules.push(i);else if(g.isSymbol("}")){f=!0;break}else(g=this.parseKeyframeRule(g,h,!0))&&(e+=g);g=this.getToken(!0,!1)}}if(f)return this.forgetState(),h.currentLine=b,h.parsedCssText=e,c.cssRules.push(h),!0;this.restoreState();return!1},parseKeyframeRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned());this.preserveState();for(var e=a,f="";e.isNotNull();){if(e.isIdent()||e.isPercentage()){if(e.isIdent()&&
!e.isIdent("from")&&!e.isIdent("to")){f="";break}f+=e.value;e=this.getToken(!0,!0);if(e.isSymbol("{")){this.ungetToken();break}else if(e.isSymbol(","))f+=", ";else{f="";break}}else{f="";break}e=this.getToken(!0,!0)}var h=!1,g=[];if(f){var i=f,e=this.getToken(!0,!0);if(e.isSymbol("{")){i+=" { ";for(e=this.getToken(!0,!1);;){if(!e.isNotNull()){h=!0;break}if(e.isSymbol("}")){i+="}";h=!0;break}else e=this.parseDeclaration(e,g,!0,!0,c),i+=(e&&g.length?" ":"")+e;e=this.getToken(!0,!1)}}}if(h)return h=new jscsspKeyframeRule,
h.currentLine=b,h.parsedCssText=i,h.declarations=g,h.keyText=f,h.parentRule=c,c.cssRules.push(h),i;this.restoreState();i=this.currentToken().value;this.addUnknownAtRule(c,i);return""},parseMediaRule:function(a,c){var b=CountLF(this.mScanner.getAlreadyScanned()),e=a.value,f=!1,h=new jscsspMediaRule;h.currentLine=b;this.preserveState();for(var b=this.getToken(!0,!0),g=!1;b.isNotNull();){if(b.isIdent())if(g=!0,e+=" "+b.value,h.media.push(b.value),b=this.getToken(!0,!0),b.isSymbol(","))e+=",";else if(b.isSymbol("{"))this.ungetToken();
else{b.type=jscsspToken.NULL_TYPE;break}else if(b.isSymbol("{"))break;else if(g){b.type=jscsspToken.NULL_TYPE;break}b=this.getToken(!0,!0)}if(b.isSymbol("{")&&h.media.length){e+=" { ";for(b=this.getToken(!0,!1);b.isNotNull();){if(b.isComment()&&this.mPreserveComments)e+=" "+b.value,g=new jscsspComment,g.parsedCssText=b.value,h.cssRules.push(g);else if(b.isSymbol("}")){f=!0;break}else(b=this.parseStyleRule(b,h,!0))&&(e+=b);b=this.getToken(!0,!1)}}if(f)return this.forgetState(),h.parsedCssText=e,c.cssRules.push(h),
!0;this.restoreState();return!1},trim11:function(a){for(var a=a.replace(/^\s+/,""),c=a.length-1;0<=c;c--)if(/\S/.test(a.charAt(c))){a=a.substring(0,c+1);break}return a},parseStyleRule:function(a,c,b){var e=CountLF(this.mScanner.getAlreadyScanned());this.preserveState();var a=this.parseSelector(a,!1),f=!1,h=[];if(a){var g=a=this.trim11(a.selector),i=this.getToken(!0,!0);if(i.isSymbol("{")){g+=" { ";for(i=this.getToken(!0,!1);;){if(!i.isNotNull()){f=!0;break}if(i.isSymbol("}")){g+="}";f=!0;break}else i=
this.parseDeclaration(i,h,!0,!0,c),g+=(i&&h.length?" ":"")+i;i=this.getToken(!0,!1)}}}if(f)return f=new jscsspStyleRule,f.currentLine=e,f.parsedCssText=g,f.declarations=h,f.mSelectorText=a,b?f.parentRule=c:f.parentStyleSheet=c,c.cssRules.push(f),g;this.restoreState();g=this.currentToken().value;this.addUnknownAtRule(c,g);return""},parseSelector:function(a,c){for(var b="",e={a:0,b:0,c:0,d:0},f=!0,h=a,g=!1,i=!1;;){if(!h.isNotNull())return c?{selector:b,specificity:e}:"";if(!c&&h.isSymbol("{")){(g=!i)&&
this.ungetToken();break}if(h.isSymbol(","))b+=h.value,f=!0,i=!1,h=this.getToken(!1,!0);else if(!i&&(h.isWhiteSpace()||h.isSymbol(">")||h.isSymbol("+")||h.isSymbol("~"))){if(h.isWhiteSpace()){b+=" ";f=this.lookAhead(!0,!0);if(!f.isNotNull())return c?{selector:b,specificity:e}:"";if(f.isSymbol(">")||f.isSymbol("+")||f.isSymbol("~"))h=this.getToken(!0,!0),b+=h.value+" ",i=!0}else b+=h.value,i=!0;f=!0;h=this.getToken(!0,!0)}else{i=this.parseSimpleSelector(h,f,!0);if(!i)break;b+=i.selector;e.b+=i.specificity.b;
e.c+=i.specificity.c;e.d+=i.specificity.d;i=f=!1;h=this.getToken(!1,!0)}}return g?{selector:b,specificity:e}:""},isPseudoElement:function(a){switch(a){case "first-letter":case "first-line":case "before":case "after":case "marker":return!0;default:return!1}},parseSimpleSelector:function(a,c,b){var e="",f={a:0,b:0,c:0,d:0};if(c&&(a.isSymbol("*")||a.isSymbol("|")||a.isIdent()))if(a.isSymbol("*")||a.isIdent())if(e+=a.value,c=a.isIdent(),a=this.getToken(!1,!0),a.isSymbol("|"))if(e+=a.value,a=this.getToken(!1,
!0),a.isIdent()||a.isSymbol("*"))e+=a.value,a.isIdent()&&f.d++;else return null;else this.ungetToken(),c&&f.d++;else{if(a.isSymbol("|"))if(e+=a.value,a=this.getToken(!1,!0),a.isIdent()||a.isSymbol("*"))e+=a.value,a.isIdent()&&f.d++;else return null}else if(a.isSymbol(".")||a.isSymbol("#"))if(c=a.isSymbol("."),e+=a.value,a=this.getToken(!1,!0),a.isIdent())e+=a.value,c?f.c++:f.b++;else return null;else if(a.isSymbol(":"))if(e+=a.value,a=this.getToken(!1,!0),a.isSymbol(":")&&(e+=a.value,a=this.getToken(!1,
!0)),a.isIdent())e+=a.value,this.isPseudoElement(a.value)?f.d++:f.c++;else if(a.isFunction()){e+=a.value;if(a.isFunction(":not(")){if(!b)return null;a=this.getToken(!0,!0);if(a=this.parseSimpleSelector(a,c,!1))if(e+=a.selector,a=this.getToken(!0,!0),a.isSymbol(")"))e+=")";else return null;else return null}else for(;;)if(a=this.getToken(!1,!0),a.isSymbol(")")){e+=")";break}else e+=a.value;f.c++}else return null;else if(a.isSymbol("[")){e+="[";a=this.getToken(!0,!0);if(a.isIdent()||a.isSymbol("*"))if(e+=
a.value,this.getToken(!0,!0),a.isSymbol("|"))if(e+="|",a=this.getToken(!0,!0),a.isIdent())e+=a.value;else return null;else this.ungetToken();else if(a.isSymbol("|"))if(e+="|",a=this.getToken(!0,!0),a.isIdent())e+=a.value;else return null;else return null;a=this.getToken(!0,!0);if(a.isIncludes()||a.isDashmatch()||a.isBeginsmatch()||a.isEndsmatch()||a.isContainsmatch()||a.isSymbol("="))if(e+=a.value,a=this.getToken(!0,!0),a.isString()||a.isIdent())e+=a.value,a=this.getToken(!0,!0);else return null;
if(a.isSymbol("]"))e+=a.value,f.c++;else return null}else if(a.isWhiteSpace()&&this.lookAhead(!0,!0).isSymbol("{"))return"";return e?{selector:e,specificity:f}:null},preserveState:function(){this.mPreservedTokens.push(this.currentToken());this.mScanner.preserveState()},restoreState:function(){if(this.mPreservedTokens.length)this.mScanner.restoreState(),this.mToken=this.mPreservedTokens.pop()},forgetState:function(){this.mPreservedTokens.length&&(this.mScanner.forgetState(),this.mPreservedTokens.pop())},
parse:function(a,c,b){if(!a)return null;this.mPreserveWS=c;this.mPreserveComments=b;this.mPreservedTokens=[];this.mScanner.init(a);a=new jscsspStylesheet;b=this.getToken(!1,!1);if(b.isNotNull()){b.isAtRule("@charset")&&(this.parseCharsetRule(b,a),b=this.getToken(!1,!1));for(var e=!1,f=!1,h=!1;b.isNotNull();){b.isWhiteSpace()?c&&this.addWhitespace(a,b.value):b.isComment()?this.mPreserveComments&&this.addComment(a,b.value):b.isAtRule()?b.isAtRule("@variables")?!f&&!e?this.parseVariablesRule(b,a):(this.reportError(kVARIABLES_RULE_POSITION),
this.addUnknownAtRule(a,b.value)):b.isAtRule("@import")?!e&&!h?f=this.parseImportRule(b,a):(this.reportError(kIMPORT_RULE_POSITION),this.addUnknownAtRule(a,b.value)):b.isAtRule("@namespace")?e?(this.reportError(kNAMESPACE_RULE_POSITION),this.addUnknownAtRule(a,b.value)):h=this.parseNamespaceRule(b,a):b.isAtRule("@font-face")?this.parseFontFaceRule(b,a)?e=!0:this.addUnknownAtRule(a,b.value):b.isAtRule("@page")?this.parsePageRule(b,a)?e=!0:this.addUnknownAtRule(a,b.value):b.isAtRule("@media")?this.parseMediaRule(b,
a)?e=!0:this.addUnknownAtRule(a,b.value):b.isAtRule("@keyframes")?this.parseKeyframesRule(b,a)||this.addUnknownAtRule(a,b.value):(b.isAtRule("@charset")?this.reportError(kCHARSET_RULE_CHARSET_SOF):this.reportError(kUNKNOWN_AT_RULE),this.addUnknownAtRule(a,b.value)):this.parseStyleRule(b,a,!1)&&(e=!0);b=this.getToken(!1)}return a}}};function jscsspToken(a,c,b){this.type=a;this.value=c;this.unit=b}jscsspToken.NULL_TYPE=0;jscsspToken.WHITESPACE_TYPE=1;jscsspToken.STRING_TYPE=2;
jscsspToken.COMMENT_TYPE=3;jscsspToken.NUMBER_TYPE=4;jscsspToken.IDENT_TYPE=5;jscsspToken.FUNCTION_TYPE=6;jscsspToken.ATRULE_TYPE=7;jscsspToken.INCLUDES_TYPE=8;jscsspToken.DASHMATCH_TYPE=9;jscsspToken.BEGINSMATCH_TYPE=10;jscsspToken.ENDSMATCH_TYPE=11;jscsspToken.CONTAINSMATCH_TYPE=12;jscsspToken.SYMBOL_TYPE=13;jscsspToken.DIMENSION_TYPE=14;jscsspToken.PERCENTAGE_TYPE=15;jscsspToken.HEX_TYPE=16;
jscsspToken.prototype={isNotNull:function(){return this.type},_isOfType:function(a,c){return this.type==a&&(!c||this.value.toLowerCase()==c)},isWhiteSpace:function(a){return this._isOfType(jscsspToken.WHITESPACE_TYPE,a)},isString:function(){return this._isOfType(jscsspToken.STRING_TYPE)},isComment:function(){return this._isOfType(jscsspToken.COMMENT_TYPE)},isNumber:function(a){return this._isOfType(jscsspToken.NUMBER_TYPE,a)},isSymbol:function(a){return this._isOfType(jscsspToken.SYMBOL_TYPE,a)},
isIdent:function(a){return this._isOfType(jscsspToken.IDENT_TYPE,a)},isFunction:function(a){return this._isOfType(jscsspToken.FUNCTION_TYPE,a)},isAtRule:function(a){return this._isOfType(jscsspToken.ATRULE_TYPE,a)},isIncludes:function(){return this._isOfType(jscsspToken.INCLUDES_TYPE)},isDashmatch:function(){return this._isOfType(jscsspToken.DASHMATCH_TYPE)},isBeginsmatch:function(){return this._isOfType(jscsspToken.BEGINSMATCH_TYPE)},isEndsmatch:function(){return this._isOfType(jscsspToken.ENDSMATCH_TYPE)},
isContainsmatch:function(){return this._isOfType(jscsspToken.CONTAINSMATCH_TYPE)},isSymbol:function(a){return this._isOfType(jscsspToken.SYMBOL_TYPE,a)},isDimension:function(){return this._isOfType(jscsspToken.DIMENSION_TYPE)},isPercentage:function(){return this._isOfType(jscsspToken.PERCENTAGE_TYPE)},isHex:function(){return this._isOfType(jscsspToken.HEX_TYPE)},isDimensionOfUnit:function(a){return this.isDimension()&&this.unit==a},isLength:function(){return this.isPercentage()||this.isDimensionOfUnit("cm")||
this.isDimensionOfUnit("mm")||this.isDimensionOfUnit("in")||this.isDimensionOfUnit("pc")||this.isDimensionOfUnit("px")||this.isDimensionOfUnit("em")||this.isDimensionOfUnit("ex")||this.isDimensionOfUnit("pt")},isAngle:function(){return this.isDimensionOfUnit("deg")||this.isDimensionOfUnit("rad")||this.isDimensionOfUnit("grad")}};
var kJscsspUNKNOWN_RULE=0,kJscsspSTYLE_RULE=1,kJscsspCHARSET_RULE=2,kJscsspIMPORT_RULE=3,kJscsspMEDIA_RULE=4,kJscsspFONT_FACE_RULE=5,kJscsspPAGE_RULE=6,kJscsspKEYFRAMES_RULE=7,kJscsspKEYFRAME_RULE=8,kJscsspNAMESPACE_RULE=100,kJscsspCOMMENT=101,kJscsspWHITE_SPACE=102,kJscsspVARIABLES_RULE=200,kJscsspSTYLE_DECLARATION=1E3,gTABS="";function jscsspStylesheet(){this.cssRules=[];this.variables={}}
jscsspStylesheet.prototype={insertRule:function(a,c){try{this.cssRules.splice(c,1,a)}catch(b){}},deleteRule:function(a){try{this.cssRules.splice(a)}catch(c){}},cssText:function(){for(var a="",c=0;c<this.cssRules.length;c++)a+=this.cssRules[c].cssText()+"\n";return a},resolveVariables:function(a){for(var c=0;c<this.cssRules.length;c++){var b=this.cssRules[c];if(b.type==kJscsspSTYLE_RULE||b.type==kJscsspIMPORT_RULE)break;else{var e;if(e=b.type==kJscsspVARIABLES_RULE)if(!(e=!b.media.length))a:{e=b.media;
for(var f=0;f<e.length;f++)if(a==e[f]){e=!0;break a}e=!1}if(e)for(e=0;e<b.declarations.length;e++){for(var f="",h=0;h<b.declarations[e].values.length;h++)f+=(h?" ":"")+b.declarations[e].values[h].value;this.variables[b.declarations[e].property]=f}}}}};function jscsspCharsetRule(){this.type=kJscsspCHARSET_RULE;this.parentRule=this.parentStyleSheet=this.parsedCssText=this.encoding=null}
jscsspCharsetRule.prototype={cssText:function(){return"@charset "+this.encoding+";"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!1,!1);if(b.isAtRule("@charset")&&a.parseCharsetRule(b,c))c=c.cssRules[0],this.encoding=c.encoding,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;}};function jscsspErrorRule(a){this.error=a?a:"INVALID";this.type=kJscsspUNKNOWN_RULE;this.parentRule=this.parentStyleSheet=this.parsedCssText=null}
jscsspErrorRule.prototype={cssText:function(){return this.parsedCssText}};function jscsspComment(){this.type=kJscsspCOMMENT;this.parentRule=this.parentStyleSheet=this.parsedCssText=null}jscsspComment.prototype={cssText:function(){return this.parsedCssText},setCssText:function(a){a=(new CSSParser(a)).getToken(!0,!1);if(a.isComment())this.parsedCssText=a.value;else throw DOMException.SYNTAX_ERR;}};
function jscsspWhitespace(){this.type=kJscsspWHITE_SPACE;this.parentRule=this.parentStyleSheet=this.parsedCssText=null}jscsspWhitespace.prototype={cssText:function(){return this.parsedCssText}};function jscsspImportRule(){this.type=kJscsspIMPORT_RULE;this.href=this.parsedCssText=null;this.media=[];this.parentRule=this.parentStyleSheet=null}
jscsspImportRule.prototype={cssText:function(){var a=this.media.join(", ");return"@import "+this.href+(a&&"all"!=a?a+" ":"")+";"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(b.isAtRule("@import")&&a.parseImportRule(b,c))c=c.cssRules[0],this.href=c.href,this.media=c.media,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;}};
function jscsspNamespaceRule(){this.type=kJscsspNAMESPACE_RULE;this.parentRule=this.parentStyleSheet=this.url=this.prefix=this.parsedCssText=null}
jscsspNamespaceRule.prototype={cssText:function(){return"@namespace "+(this.prefix?this.prefix+" ":"")+this.url+";"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(b.isAtRule("@namespace")&&a.parseNamespaceRule(b,c))c=c.cssRules[0],this.url=c.url,this.prefix=c.prefix,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;}};
function jscsspDeclaration(){this.type=kJscsspSTYLE_DECLARATION;this.property=null;this.values=[];this.parentRule=this.parentStyleSheet=this.parsedCssText=this.priority=this.valueText=null}
jscsspDeclaration.prototype={kCOMMA_SEPARATED:{cursor:!0,"font-family":!0,"voice-family":!0,"background-image":!0},kUNMODIFIED_COMMA_SEPARATED_PROPERTIES:{"text-shadow":!0,"box-shadow":!0,"-moz-transition":!0,"-moz-transition-property":!0,"-moz-transition-duration":!0,"-moz-transition-timing-function":!0,"-moz-transition-delay":!0},cssText:function(){var a=CssInspector.prefixesForProperty(this.property);if(this.property in this.kUNMODIFIED_COMMA_SEPARATED_PROPERTIES){if(a){for(var c="",b=0;b<a.length;b++)var e=
a[b],c=c+((b?gTABS:"")+e+": "),c=c+(this.valueText+(this.priority?" !important":"")+";"),c=c+(1<a.length&&b!=a.length-1?"\n":"");return c}return this.property+": "+this.valueText+(this.priority?" !important":"")+";"}if(a){c="";for(b=0;b<a.length;b++){var e=a[b],c=c+((b?gTABS:"")+e+": "),e=e in this.kCOMMA_SEPARATED?", ":" ",f=0;for(;f<this.values.length;f++)if(null!=this.values[f].cssText())c+=(f?e:"")+this.values[f].cssText();else return null;c+=(this.priority?" !important":"")+";"+(1<a.length&&
b!=a.length-1?"\n":"")}return c}c=this.property+": ";e=this.property in this.kCOMMA_SEPARATED?", ":" ";a={webkit:!1,presto:!1,trident:!1,generic:!1};for(f=0;f<this.values.length;f++){var h=this.values[f].cssText();if(null!=h){var g=h.indexOf("("),i=h;-1!=g&&(i=h.substr(0,g));if(i in kCSS_VENDOR_VALUES)for(b in kCSS_VENDOR_VALUES[i])a[b]=a[b]||""!=kCSS_VENDOR_VALUES[i][b];c+=(f?e:"")+h}else return null}c+=(this.priority?" !important":"")+";";for(b in a)if(a[b]){for(var j="\n"+gTABS+this.property+": ",
f=0;f<this.values.length;f++)if(h=this.values[f].cssText(),null!=h){g=h.indexOf("(");i=h;-1!=g&&(i=h.substr(0,g));if(i in kCSS_VENDOR_VALUES&&(functor=kCSS_VENDOR_VALUES[i][b]))if(h="string"==typeof functor?functor:functor(h,b),!h){j=null;break}j+=(f?e:"")+h}else return null;c=j?c+(j+";"):c+("\n"+gTABS+"/* Impossible to translate property "+this.property+" for "+b+" */")}return c},setCssText:function(a){var c=[],a=new CSSParser(a),b=a.getToken(!0,!0);if(a.parseDeclaration(b,c,!0,!0,null)&&c.length&&
c[0].type==kJscsspSTYLE_DECLARATION)c=c.cssRules[0],this.property=c.property,this.value=c.value,this.priority=c.priority,this.parsedCssText=newRule.parsedCssText;else throw DOMException.SYNTAX_ERR;}};function jscsspFontFaceRule(){this.type=kJscsspFONT_FACE_RULE;this.parsedCssText=null;this.descriptors=[];this.parentRule=this.parentStyleSheet=null}
jscsspFontFaceRule.prototype={cssText:function(){var a=gTABS+"@font-face {\n",c=gTABS;gTABS+="  ";for(var b=0;b<this.descriptors.length;b++)a+=gTABS+this.descriptors[b].cssText()+"\n";gTABS=c;return a+gTABS+"}"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(b.isAtRule("@font-face")&&a.parseFontFaceRule(b,c))c=c.cssRules[0],this.descriptors=c.descriptors,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;}};
function jscsspKeyframesRule(){this.type=kJscsspKEYFRAMES_RULE;this.parsedCssText=null;this.cssRules=[];this.parentRule=this.parentStyleSheet=this.name=null}
jscsspKeyframesRule.prototype={cssText:function(){var a=gTABS+"@keyframes "+this.name+" {\n",c=gTABS;gTABS+="  ";for(var b=0;b<this.cssRules.length;b++)a+=gTABS+this.cssRules[b].cssText()+"\n";gTABS=c;return a+=gTABS+"}\n"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(b.isAtRule("@keyframes")&&a.parseKeyframesRule(b,c))c=c.cssRules[0],this.cssRules=c.cssRules,this.name=c.name,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;}};
function jscsspKeyframeRule(){this.type=kJscsspKEYFRAME_RULE;this.parsedCssText=null;this.declarations=[];this.parentRule=this.parentStyleSheet=this.keyText=null}
jscsspKeyframeRule.prototype={cssText:function(){var a=this.keyText+" {\n",c=gTABS;gTABS+="  ";for(var b=0;b<this.declarations.length;b++)this.declarations[b].cssText()&&(a+=gTABS+this.declarations[b].cssText()+"\n");gTABS=c;return a+gTABS+"}"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(!b.isNotNull()&&a.parseKeyframeRule(b,c,!1))c=c.cssRules[0],this.keyText=c.keyText,this.declarations=c.declarations,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;
}};function jscsspMediaRule(){this.type=kJscsspMEDIA_RULE;this.parsedCssText=null;this.cssRules=[];this.media=[];this.parentRule=this.parentStyleSheet=null}
jscsspMediaRule.prototype={cssText:function(){var a=gTABS+"@media "+this.media.join(", ")+" {\n",c=gTABS;gTABS+="  ";for(var b=0;b<this.cssRules.length;b++)a+=gTABS+this.cssRules[b].cssText()+"\n";gTABS=c;return a+gTABS+"}"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(b.isAtRule("@media")&&a.parseMediaRule(b,c))c=c.cssRules[0],this.cssRules=c.cssRules,this.media=c.media,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;}};
function jscsspStyleRule(){this.type=kJscsspSTYLE_RULE;this.parsedCssText=null;this.declarations=[];this.parentRule=this.parentStyleSheet=this.mSelectorText=null}
jscsspStyleRule.prototype={cssText:function(){var a=this.mSelectorText+" {\n",c=gTABS;gTABS+="  ";for(var b=0;b<this.declarations.length;b++)this.declarations[b].cssText()&&(a+=gTABS+this.declarations[b].cssText()+"\n");gTABS=c;return a+gTABS+"}"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(!b.isNotNull()&&a.parseStyleRule(b,c,!1))c=c.cssRules[0],this.mSelectorText=c.mSelectorText,this.declarations=c.declarations,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;
},selectorText:function(){return this.mSelectorText},setSelectorText:function(a){var a=new CSSParser(a),c=a.getToken(!0,!0);if(!c.isNotNull()&&(a=a.parseSelector(c,!0))){this.mSelectorText=a.selector;return}throw DOMException.SYNTAX_ERR;}};function jscsspPageRule(){this.type=kJscsspPAGE_RULE;this.pageSelector=this.parsedCssText=null;this.declarations=[];this.parentRule=this.parentStyleSheet=null}
jscsspPageRule.prototype={cssText:function(){var a=gTABS+"@page "+(this.pageSelector?this.pageSelector+" ":"")+"{\n",c=gTABS;gTABS+="  ";for(var b=0;b<this.declarations.length;b++)a+=gTABS+this.declarations[b].cssText()+"\n";gTABS=c;return a+gTABS+"}"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(b.isAtRule("@page")&&a.parsePageRule(b,c))c=c.cssRules[0],this.pageSelector=c.pageSelector,this.declarations=c.declarations,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;
}};function jscsspVariablesRule(){this.type=kJscsspVARIABLES_RULE;this.parsedCssText=null;this.declarations=[];this.media=this.parentRule=this.parentStyleSheet=null}
jscsspVariablesRule.prototype={cssText:function(){var a=gTABS+"@variables "+(this.media.length?this.media.join(", ")+" ":"")+"{\n",c=gTABS;gTABS+="  ";for(var b=0;b<this.declarations.length;b++)a+=gTABS+this.declarations[b].cssText()+"\n";gTABS=c;return a+gTABS+"}"},setCssText:function(a){var c={cssRules:[]},a=new CSSParser(a),b=a.getToken(!0,!0);if(b.isAtRule("@variables")&&a.parseVariablesRule(b,c))c=c.cssRules[0],this.declarations=c.declarations,this.parsedCssText=c.parsedCssText;else throw DOMException.SYNTAX_ERR;
}};var kJscsspINHERIT_VALUE=0,kJscsspPRIMITIVE_VALUE=1,kJscsspVARIABLE_VALUE=4;function jscsspVariable(a,c){this.value="";this.type=a;this.parentRule=this.name=null;this.parentStyleSheet=c}
jscsspVariable.prototype={cssText:function(){return this.type==kJscsspVARIABLE_VALUE?this.resolveVariable(this.name,this.parentRule,this.parentStyleSheet):this.value},setCssText:function(a){if(this.type==kJscsspVARIABLE_VALUE)throw DOMException.SYNTAX_ERR;this.value=a},resolveVariable:function(a,c,b){return a.toLowerCase()in b.variables?b.variables[a.toLowerCase()]:null}};
function ParseURL(a){for(var c={protocol:"",user:"",password:"",host:"",port:"",path:"",query:""},b="PROTOCOL",e=0,f=!1;e<a.length;)if("PROTOCOL"==b)":"==a.charAt(e)?(b="AFTER_PROTOCOL",e++):"/"==a.charAt(e)&&0==c.protocol.length()?b=PATH:c.protocol+=a.charAt(e++);else if("AFTER_PROTOCOL"==b)if("/"==a.charAt(e))f?(f=!1,b="USER"):f=!0,e++;else throw new ParseException("Protocol shell be separated with 2 slashes");else"USER"==b?"/"==a.charAt(e)?(c.host=c.user,c.user="",b="PATH"):"?"==a.charAt(e)?(c.host=
c.user,c.user="",b="QUERY",e++):":"==a.charAt(e)?(b="PASSWORD",e++):"@"==a.charAt(e)?(b="HOST",e++):c.user+=a.charAt(e++):"PASSWORD"==b?"/"==a.charAt(e)?(c.host=c.user,c.port=c.password,c.user="",c.password="",b="PATH"):"?"==a.charAt(e)?(c.host=c.user,c.port=c.password,c.user="",c.password="",b="QUERY",e++):"@"==a.charAt(e)?(b="HOST",e++):c.password+=a.charAt(e++):"HOST"==b?"/"==a.charAt(e)?b="PATH":":"==a.charAt(e)?(b="PORT",e++):"?"==a.charAt(e)?(b="QUERY",e++):c.host+=a.charAt(e++):"PORT"==b?"/"==
a.charAt(e)?b="PATH":"?"==a.charAt(e)?(b="QUERY",e++):c.port+=a.charAt(e++):"PATH"==b?"?"==a.charAt(e)?(b="QUERY",e++):c.path+=a.charAt(e++):"QUERY"==b&&(c.query+=a.charAt(e++));if("PROTOCOL"==b)c.host=c.protocol,c.protocol="http";else{if("AFTER_PROTOCOL"==b)throw new ParseException("Invalid url");if("USER"==b)c.host=c.user,c.user="";else if("PASSWORD"==b)c.host=c.user,c.port=c.password,c.user="",c.password=""}return c}function ParseException(a){this.description=a}
function CountLF(a){return(a=a.match(/\n/g))?a.length+1:1}
function FilterLinearGradientForOutput(a,c){if("generic"==c)return a.substr(5);if("webkit"==c)return a.replace(/\-moz\-/g,"-webkit-");if("webkit20110101"!=c)return"";var b=CssInspector.parseBackgroundImages(a)[0],e=!1,f="-webkit-gradient(linear, ",h="position"in b.value?b.value.position.toLowerCase():"",g="angle"in b.value?b.value.angle.toLowerCase():"";if(g){var i=g.match(/^([0-9\-\.\\+]+)([a-z]*)/),g=parseFloat(i[1]),i=i[2];switch(i){case "grad":g=90*g/100;break;case "rad":g=180*g/Math.PI}for(;0>
g;)g+=360;for(;360<=g;)g-=360}var j=[],k=[];if(""!=h)if("center"==h&&(h="center center"),j=h.split(" "),""==g&&0!=g){switch(j[0]){case "left":k.push("right");break;case "center":k.push("center");break;case "right":k.push("left");break;default:i=j[0].match(/^([0-9\-\.\\+]+)([a-z]*)/),h=parseFloat(i[0]),i=i[1],"%"==i?k.push(100-h+"%"):e=!0}if(!e)switch(j[1]){case "top":k.push("bottom");break;case "center":k.push("center");break;case "bottom":k.push("top");break;default:i=j[1].match(/^([0-9\-\.\\+]+)([a-z]*)/),
h=parseFloat(i[0]),i=i[1],"%"==i?k.push(100-h+"%"):e=!0}}else switch(g){case 0:k.push("right");k.push(j[1]);break;case 90:k.push(j[0]);k.push("top");break;case 180:k.push("left");k.push(j[1]);break;case 270:k.push(j[0]);k.push("bottom");break;default:e=!0}else switch(""==g&&(g=270),g){case 0:j=["left","center"];k=["right","center"];break;case 90:j=["center","bottom"];k=["center","top"];break;case 180:j=["right","center"];k=["left","center"];break;case 270:j=["center","top"];k=["center","bottom"];
break;default:e=!0}if(e)return"";f+=j.join(" ")+", "+k.join(" ");if(!b.value.stops[0].position)b.value.stops[0].position="0%";if(!b.value.stops[b.value.stops.length-1].position)b.value.stops[b.value.stops.length-1].position="100%";for(k=j=0;k<b.value.stops.length&&!e;k++){h=b.value.stops[k];if(h.position){if(-1==h.position.indexOf("%")){e=!0;break}}else{for(g=k+1;g<b.value.stops.length&&!b.value.stops[g].position;)g++;for(var i=parseFloat(b.value.stops[g].position)-j,l=k;l<g;l++)b.value.stops[l].position=
j+i*(l-k+1)/(g-k+1)+"%"}j=parseFloat(h.position);f+=", color-stop("+parseFloat(j)/100+", "+h.color+")"}return e?"":f+")"}
function FilterRadialGradientForOutput(a,c){if("generic"==c)return a.substr(5);if("webkit"==c)return a.replace(/\-moz\-/g,"-webkit-");if("webkit20110101"!=c)return"";var b=CssInspector.parseBackgroundImages(a)[0],e="size"in b.value?b.value.size:"";if("circle"!=("shape"in b.value?b.value.shape:"")||"farthest-corner"!=e&&"cover"!=e||2>b.value.stops.length||!("position"in b.value.stops[0])||!b.value.stops[b.value.stops.length-1].position||!("position"in b.value.stops[0])||!b.value.stops[b.value.stops.length-
1].position)return"";for(var f=0;f<b.value.stops.length;f++){var h=b.value.stops[f];if("position"in h&&h.position&&-1==h.position.indexOf("px"))return""}var f="position"in b.value?b.value.position:"center center",e="-webkit-gradient(radial, "+(f+", "+parseFloat(b.value.stops[0].position)+", "),e=e+(f+", "+parseFloat(b.value.stops[b.value.stops.length-1].position)),g=parseFloat(b.value.stops[0].position),f=0;for(;f<b.value.stops.length;f++){h=b.value.stops[f];if(!("position"in h)||!h.position){for(var i=
f+1;i<b.value.stops.length&&!b.value.stops[i].position;)i++;for(var j=parseFloat(b.value.stops[i].position)-g,k=f;k<i;k++)b.value.stops[k].position=g+j*(k-f+1)/(i-f+1)+"px"}g=parseFloat(h.position);i=(g-parseFloat(b.value.stops[0].position))/(parseFloat(b.value.stops[b.value.stops.length-1].position)-parseFloat(b.value.stops[0].position));e+=", color-stop("+i+", "+h.color+")"}return e+")"}
function FilterRepeatingGradientForOutput(a,c){return"generic"==c?a.substr(5):"webkit"==c?a.replace(/\-moz\-/g,"-webkit-"):""};


    this._isStart = false;
    this.styleSheetList = [];
    this.popupBoxShowing = false;
    var context = this;
    
	var WRAPER_ID = '__css_viewer_wraper__';
	var WRAPER_STYLE_TEXT = 'box-sizing: border-box; pointer-events: none; position: absolute; display: none; border: red dotted 2px; color: red; z-index: 2147483647; ';
	
	var POPUPBOX_ID = '__css_viewer_popupbox__';
	var POPUPBOX_CSS_STYLE = '';
	var POPUPBOX_HTML_TEMPLATE = '<% for(var i = rules.length - 1; i >= 0; i--){ %><div class="__css_viewer_header"><%=rules[i].selector %></div><div class="__css_viewer_content"><% var styles = rules[i].style;var style;for(var s in styles){ var style = styles[s];%><div class="__css_viewer_item <%=style.isOverride ? "__css_viewer_item_override" : "" %>"><div class="__css_viewer_key"><%=s %></div><span class="__css_viewer_sign">: </span><div class="__css_viewer_value"><%=style.value %></div><span class="__css_viewer_sign">;</span></div><% } %></div><% } %>';
	
	var templateCache = {};
	
    this.parser = new CSSParser();
	
	HTMLElement.prototype.css = function(style){
		var el = this;
		for(var i in style){
			el.style[i] = style[i];
		}
	}
	
    var template = function(str, data){
        var fn = !/\W/.test(str) ?
          templateCache[str] = templateCache[str] ||
            template(document.getElementById(str).innerHTML) :
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" +
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
        return data ? fn( data ) : fn;
    };
    
    var isEmptyObject = function(obj){
        for(var n in obj){
            return false;
        }
        return true;
    }
	
	var getWraper = function(createFlag){
		var wraper = document.getElementById(WRAPER_ID);
		if(!wraper && createFlag){
			wraper = document.createElement('div');
			wraper.id = WRAPER_ID;
			wraper.style.cssText = WRAPER_STYLE_TEXT;
			document.body.appendChild(wraper);
		}
		return wraper;
	}
	
	var hideWraper = function(){
		var wraper = getWraper();
		if(wraper){
			wraper.css({display: 'none' });
		}
	}
	
	var getScrollTop = function(){
		return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	}
	
	var getScrollLeft = function(){
		return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	}
	var getPopupBox = function(createFlag){
		var popup = document.getElementById(POPUPBOX_ID);
		if(!popup && createFlag){
			popup = document.createElement('div');
			popup.id = POPUPBOX_ID;
			document.body.appendChild(popup);
		}
		return popup;
	}
	
    
    
	var showPopupBox = function(x, y){
		var popup = getPopupBox();
        var top = y + 5;
        var left = x + 5;
		popup.css({
			// top: '-10000em',
			// left: '-10000em',
			display: 'block'
		});
        var rect = popup.getBoundingClientRect();
        var docWidth = document.documentElement.offsetWidth;
        var docHeight = document.documentElement.offsetHeight;
        if(rect.width + left >= docWidth){
            left = docWidth - rect.width - 5;
        }
        if(rect.height + top >= docHeight){//这里还有优化的地方
            top = docHeight - rect.height - 5;
        }
        if(left < 5){
            left = 5;
        }
        if(top < 5){
            top = 5;
        }
        popup.css({
            top: top + 'px',
			left: left + 'px'
		});
        context.popupBoxShowing = true;
	}
    
    var hidePopupBox = function(){
        var popup = getPopupBox();
        if(popup){
            popup.css({ display: 'none' });
        }
        context.popupBoxShowing = false;
    }
	
	//  匹配 @import之类的
	var META_REGEX = /@([^\-]*?)\s+([^{}]*?);/g;
	//  去掉 @-webkit-key-frames{... } 这类属性
	var KEY_FRAMES_REGEX = /@[^;.]*?{([^@.]*?{.*?})*}/g;
	// @media screen 这类
	var MEDIA_META_REGEX = /@[^{]+{([^\s;{}][^}]+?\s*{\s*.*?\s*})*?}/g;
	//匹配所有css类和style, 排除了@这类标识符
	var CLASS_STYLE_REGEX = /([^\s;{}][^}]+?)\s*{\s*(.*?)\s*}/g;
	//匹配所有key和值
	var KEY_VALUE_REGEX = /\s*(.+?):\s*(.+?)(;|$)/g;
	
	var BAD_STYLE_PREX = /^[*+_]/;
	
	var parseCss = function(cssText){
		var list = [];
		cssText = cssText.replace(KEY_FRAMES_REGEX, '')
			.replace(META_REGEX, '')//暂时把import这类去掉
			.replace(MEDIA_META_REGEX, '');//TODO ie expression....-_-||
		
		var styleReg = CLASS_STYLE_REGEX, styleMatch;
		var part, selector, values;
		while(styleMatch = styleReg.exec(cssText)){
			values = styleMatch[2].trim();
			if(!values){//空类不要
				continue;
			}
			selector = styleMatch[1].trim();
			if(BAD_STYLE_PREX.test(selector)){
				continue;
			}
			list.push({
				selector: selector,
				style: convertCssText(values)
			});
		}
		return list;
	}
	
    var convertCssText = function(cssText){
        var style = {},
			valueReg = KEY_VALUE_REGEX, valueMatch;
        while(valueMatch = valueReg.exec(cssText)){
            style[valueMatch[1]] = valueMatch[2];
        }
        return style;
    }
    
	var analysisStyleList = function(){
		var sheet;
        var styleSheetList = context.styleSheetList;
		for(var i = 0, len = styleSheetList.length; i < len; i++){
			sheet = styleSheetList[i];
			if(!sheet.url){
				sheet = styleSheetList[i] = {
					cssText: sheet
				}
				// console.log(sheet.cssText);
			}
            sheet.cssText = sheet.cssText.replace(/(\r?\n)/g, '').replace(/(\/\*.*?\*\/)/g, '');
			sheet.cssList = parseCss(sheet.cssText);
            sheet.styleList = context.parser.parse(sheet.cssText, false, false);
		}
		console.log(styleSheetList);
	}
	
	var downloadFile = function(url, id){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);//为了逻辑更简单点, 同步加载
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				context.styleSheetList[id] = {
					url: url,
					cssText: xhr.responseText
				};
			}
		}
		xhr.send();
	}
	var loadLinkStyleSheet = function(callback){
        var styleSheets = document.styleSheets;
        if(context.styleSheetList.length == styleSheets.length){
            callback && callback();
            return;
        }
        
		var originalCursor = document.body.style.cursor;
		document.body.style.cursor = 'wait';
		
		var styleSheetList = context.styleSheetList = [];
		styleSheetList[styleSheets.length - 1] = 0;
		var url;
		for(var i = 0, slen = styleSheets.length; i < slen; i++){
			sheet = styleSheets[i];
			if(sheet.ownerNode.constructor === HTMLStyleElement){//这是个style标签
				styleSheetList[i] = sheet.ownerNode.innerHTML;
			}else{/*  if(sheet.ownerNode.constructor === HTMLLinkElement) */
				//link 标签, 发请求下载css文件
				url = sheet.href.trim();//TODO url 路径检查
				if(url){
					downloadFile(url, i);
				}
				
			}
		}
		analysisStyleList();
		document.body.style.cursor = originalCursor;
		callback && callback();
	}
	
    var checkOverride = function(list, pro){
        for(var i in list){
            if(list[i].style[pro]){
                list[i].style[pro].isOverride = true;
            }
        }
    }
    
    var convertStyle = function(styleList, originStyle){
        var style = {};
        for(var h in originStyle){
            style[h] = {
                value: originStyle[h]
            }
            checkOverride(styleList, h);
        }
        return style;
    }
    
	var getComputedStyle = function(el){
        var styleSheetList = context.styleSheetList;
        var rules, rule, style, flag;
        var styleList = [];
        for(var i in styleSheetList){
            rules = styleSheetList[i].cssList;
            for(var j in rules){
                rule = rules[j];
				try{
                if(el.webkitMatchesSelector(rule.selector)){
                    style = convertStyle(styleList, rule.style);
                    if(!isEmptyObject(style)){
                        styleList.push({
                            selector: rule.selector,
                            style: style
                        });
                    }
                }
				}catch(e){
				console.error('error:', i, j);
				console.error(rule.selector);
				}
            }
        }
		var selfStyle = convertCssText(el.style.cssText);
        selfStyle = convertStyle(styleList, selfStyle);
        if(!isEmptyObject(selfStyle)){
            styleList.push({
                selector: '(element.style)',
                style: selfStyle
            });
        }
        return styleList;
	}
	
	
    var onDocumentMouseOver = function(e){
        var target = e.target;
        var rect = target.getBoundingClientRect();
        var wraper = getWraper(true);
		var scrollTop = getScrollTop();
		var scrollLeft = getScrollLeft();
        wraper.css({
            'width': rect.width + 'px',
            'height': rect.height + 'px',
            'top': rect.top + scrollTop + 'px',
            'left': rect.left + scrollLeft + 'px',
            'display': 'block'
        });
		var styleList = getComputedStyle(target);
        // console.log('element style:');
        // console.log(styleList);
        if(styleList.length){
            var popup = getPopupBox(true);
            var html = template(POPUPBOX_HTML_TEMPLATE, {rules: styleList});
            popup.innerHTML = html;
            showPopupBox(e.pageX, e.pageY);
        }else{
            hidePopupBox();
        }
    }
	
    var onDocumentMouseMove = function(e){
        if(context.popupBoxShowing){
            showPopupBox(e.pageX , e.pageY );
        }
    }
    
	this.start = function(){
        if(!this._isStart){
            this._isStart = true;
			loadLinkStyleSheet(function(){
				document.addEventListener('mouseover', onDocumentMouseOver, false);
				document.addEventListener('mousemove', onDocumentMouseMove, false);
			});
			
        }
    }
	
	this.stop = function(){
        if(this._isStart){
            this._isStart = false;
            hideWraper();
            hidePopupBox();
            document.removeEventListener('mouseover', onDocumentMouseOver, false);
            document.removeEventListener('mousemove', onDocumentMouseMove, false);
        }
    }
    this.isStart = function(){
        return this._isStart;
    }
}

(function(){
	if(!window.getCssViewer){
		window.getCssViewer = function(){
			if(!window.__css_viewer){
				window.__css_viewer = new CssViewer();
			}
			return window.__css_viewer;
		}
	}
	var viewer = window.getCssViewer();
	if(viewer.isStart()){
		viewer.stop();
	}else{
		viewer.start();
	}
})();

//end coding
})(window, document);
//////////////////////////////////
