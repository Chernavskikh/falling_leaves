module.exports = {
    "extends": "stylelint-config-standard",
    "rules": {
        "no-empty-source": null,
        "at-rule-no-vendor-prefix": true,
        "color-hex-case": "upper",
        "color-named": "never",
        "property-no-vendor-prefix": true,
        "selector-no-vendor-prefix": true,
        "value-no-vendor-prefix": true,
        "selector-type-no-unknown": [true, {
            "ignoreTypes": ["/^md-/"],
        }],
        "at-rule-no-unknown": [true, {
            "ignoreAtRules": ["function", "if", "ignores", "include", "extend", "mixin", "content", "supports"]
        }],
        "indentation": 4,
        "number-leading-zero": null,
        "unit-whitelist": ["em", "rem", "s", "ms", "vh", "vw", "deg", "px", "%", "in", "dpcm"],
    }
}
