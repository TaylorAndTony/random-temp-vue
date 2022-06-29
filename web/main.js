const App = {
	data() {
		return {
			title: '全能随机温度生成器',
			tempfrom: 35.5,
			tempto: 36.6,
			temptemp: '$℃t$℃t$℃',
			tempHcount: 1,
			tempVcount: 1,
			tempHsplit: 't',
			tempVsplit: 'n',
			finalRes: '---',
			copyBtn: '复制',
			featureStr: '<35.5,36.6>-<$℃t$℃t$℃>-<1,t,1,n>'
		}
	},
	methods: {
		/**
		 * Smart parse template string contains $, n, t to meaningful str
		 * @param {Object} s The template string
		 */
		parseTemplateString(s) {
			let res = '';
			let local_tempfrom = parseFloat(this.tempfrom);
			let local_tempto = parseFloat(this.tempto);
			for (let char of s) {
				switch (char) {
					case 'n':
						res += '\n';
						break;
					case 't':
						res += '\t';
						break;
					case '$':
						let rand = Math.random() * (local_tempfrom - local_tempto) + local_tempfrom + 1;
						res += rand.toFixed(1);
						break;
					default:
						res += char;
				}
			}
			return res;
		},
		/**
		 * Generate all groups with lines and cols
		 */
		generateGroups() {
			let local_tempHcount = parseInt(this.tempHcount);
			let local_tempVcount = parseInt(this.tempVcount);
			
			let finalRes = '';
			
			let local_Hsplit = this.parseTemplateString(this.tempHsplit);
			let local_Vsplit = this.parseTemplateString(this.tempVsplit);
			
			for (let row = 0; row < local_tempVcount; row++) {
				for (let col = 0; col < local_tempHcount; col++) {
					let one = this.generateOneGroup();
					finalRes += one;
					// if (col !== local_tempVcount - 1) {
					finalRes += local_Hsplit;
					// }
				}
				finalRes += local_Vsplit;
			}
			console.log(finalRes);
			this.finalRes = finalRes;
			this.makeFeatureStr();
		},
		/**
		 * Generate a single temp group using template
		 */
		generateOneGroup() {
			return this.parseTemplateString(this.temptemp);
		},
		/**
		 * Reset all
		 */
		reset() {
			this.tempfrom = 35.5;
			this.tempto = 36.6;
			this.temptemp = '$℃t$℃t$℃';
			this.finalRes = '---';
		},
		/**
		 * Copy all final result
		 */
		copy() {
			this.$refs.textarea.select();
			document.execCommand('Copy');
		},
		makeFeatureStr() {
			let feat = `<${this.tempfrom},${this.tempto}>-`;
			feat += `<${this.temptemp}>-`;
			feat += `<${this.tempHcount},${this.tempHsplit},${this.tempVcount},${this.tempVsplit}>`;
			console.log('# Feature String is:', feat);
			this.featureStr = feat;
		},
		updateFromFeatureStr() {
			const regex = /<(\d+\.?\d+?),(\d+\.?\d+?)>-<(.+?)>-<(\d+?),(\w+?),(\d+?),(\w+?)>/gm;
			let res = regex.exec(this.featureStr);
			console.log('# Regex match is:', res);
			if (res.length !== 8) {
				console.log('# Regex err, length is not 8, match group is:', res)
				return;
			}
			this.tempfrom = res[1];
			this.tempto = res[2];
			this.temptemp = res[3];
			this.tempHcount = res[4];
			this.tempHsplit = res[5];
			this.tempVcount = res[6];
			this.tempVsplit = res[7]
		},
		copyFeature() {
			this.$refs.feat.select();
			document.execCommand('Copy');
		}
	}
}

Vue.createApp(App).mount('#app')
