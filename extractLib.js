/* eslint-disable prefer-const */
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const extractLib = (webpackConfig) => {

    console.log('webpackConfig', webpackConfig)

    const originalObject = webpackConfig

    webpackConfig.module.rules.forEach((rule) => {
        console.log('rules', rule)
        if (rule.oneOf) {
            rule.oneOf.forEach((el) => {
                console.log('el', el)
                if (el.options) {
                    console.log('el options', el.options)
                }
            })
        }
    })

    // webpackConfig.module.paths.forEach((path) => {
    //     console.log('path', path)
    // })

    const overRideRules = webpackConfig.module.rules.map((rule) => {
        // console.log('rules', rule)
        if (rule.oneOf) {
            rule.oneOf = rule.oneOf.map((el) => {
                // console.log('el', el)

                // if (el.use) {
                //     el.use.forEach((loader) => {
                //         console.log('loader', loader)
                //     })
                // }
                if (el.use) {
                    el.use = el.use.map((loader) => {
                        // console.log('loader', loader)
                        if (loader.options.root) {
                            loader.options.root = path.resolve(__dirname, 'src', '@core', 'components', 'moderniza')
                        }
                        return loader
                    })
                }

                if (el.include) {
                    el.include = path.resolve(__dirname, 'src', '@core', 'components', 'moderniza')
                }
                // console.log('el include', el.include)
                return el
            })
        }

        return rule

    })

    // console.log('overRideRules', overRideRules)
    // overRideRules.forEach((rule) => {
    //     console.log('rule oeverride', rule)
    //     if (rule.oneOf) {
    //         rule.oneOf.forEach((el) => {
    //             console.log('el override', el)
    //         })
    //     }
    // })

    const libExtract = {
        ...webpackConfig,
        resolve: {
            ...webpackConfig.resolve,
            modules: ['node_modules', path.resolve(__dirname, 'src', '@core', 'components', 'moderniza')]
        },
        module: {
            strictExportPresence: true,
            rules: overRideRules
        },
        entry: path.resolve(__dirname, 'src', '@core', 'components', 'moderniza', "index.js"),
        output: {
            ...webpackConfig.output,
            path: path.resolve(__dirname, 'lib'),
            filename: 'bundle.umd.js',
            library: 'test-repository',
            libraryTarget: "umd"
        },
        plugins: [
            ...webpackConfig.plugins,
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            })
        ]
    }

    console.log('libExtract', libExtract)

    libExtract.module.rules.forEach((rule) => {
        console.log('rules', rule)
        if (rule.oneOf) {
            rule.oneOf.forEach((el) => {
                console.log('el', el)
                if (el.options?.presets) {
                    el.options.presets.forEach((preset) => {
                        console.log('preset', preset)
                        preset.forEach((eee) => {
                            console.log('pre preset', eee)
                        })
                    })
                }
                if (el.use) {
                    el.use.forEach((loader) => {
                        console.log('loader', loader)
                    })
                }
            })
        }
    })

    // TODO: remover js e manter apenas css

    return [originalObject, webpackConfig]

    // return webpackConfig
    // Return Array of default and lib config
    return [webpackConfig, libExtract]

}

module.exports = extractLib